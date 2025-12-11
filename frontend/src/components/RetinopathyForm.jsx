import { useState } from "react";
import { predictRetinopathy } from "../services/api";

export default function RetinopathyForm({ onResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner un fichier image.");
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setError("");
    setSelectedFile(file);

    // Créer une preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedFile) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await predictRetinopathy(selectedFile);
      onResult(result);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        "Erreur lors de la prédiction. Vérifiez que l'API est bien lancée et que l'image est valide."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Prédiction de rétinopathie diabétique</h2>
      <p className="card-description">
        Uploadez une image d'œil pour analyser le stade de rétinopathie diabétique.
      </p>

      <form onSubmit={handleSubmit} className="retinopathy-form">
        <div className="form-group">
          <label className="form-label" htmlFor="image-upload">
            Image d'œil (PNG, JPG, JPEG)
          </label>
          <input
            id="image-upload"
            className="form-input-file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        {preview && (
          <div className="image-preview-container">
            <p className="preview-label">Aperçu de l'image :</p>
            <img
              src={preview}
              alt="Preview"
              className="image-preview"
            />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={loading || !selectedFile}
          className="btn-primary"
        >
          {loading ? "Analyse en cours..." : "Analyser l'image"}
        </button>
      </form>
    </div>
  );
}

