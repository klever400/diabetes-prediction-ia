import { useState } from "react";
import { predictDiabetes } from "../services/api";

export default function DiabetesForm({ onResult }) {
  const [form, setForm] = useState({
    Pregnancies: 0,
    Glycemia_gL: 1.0,
    BloodPressure: 80,
    SkinThickness: 20,
    Insulin: 80,
    BMI: 25,
    DiabetesPedigreeFunction: 0.5,
    Age: 30,
    heart_disease: 0,
    hypertension: 0,
    HbA1c_level: 5.6,
    gender: "Female",
    smoking_status: "never",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await predictDiabetes(form);
      onResult(result);
    } catch (err) {
      console.error(err);
      setError(
        "Erreur lors de la prédiction. Vérifie que l'API est bien lancée."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="card-title">Formulaire de prédiction</h2>

      <form onSubmit={handleSubmit} className="diabetes-form">
        <div className="form-group">
          <label className="form-label" htmlFor="Pregnancies">
            Pregnancies
          </label>
          <input
            id="Pregnancies"
            className="form-input"
            type="number"
            name="Pregnancies"
            value={form.Pregnancies}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="Glycemia_gL">
            Glycemia (g/L)
          </label>
          <input
            id="Glycemia_gL"
            className="form-input"
            type="number"
            step="0.01"
            name="Glycemia_gL"
            value={form.Glycemia_gL}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="BloodPressure">
            Blood Pressure
          </label>
          <input
            id="BloodPressure"
            className="form-input"
            type="number"
            name="BloodPressure"
            value={form.BloodPressure}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="SkinThickness">
            Skin Thickness
          </label>
          <input
            id="SkinThickness"
            className="form-input"
            type="number"
            name="SkinThickness"
            value={form.SkinThickness}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="Insulin">
            Insulin
          </label>
          <input
            id="Insulin"
            className="form-input"
            type="number"
            name="Insulin"
            value={form.Insulin}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="BMI">
            BMI
          </label>
          <input
            id="BMI"
            className="form-input"
            type="number"
            step="0.1"
            name="BMI"
            value={form.BMI}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="DiabetesPedigreeFunction">
            Diabetes Pedigree Function
          </label>
          <input
            id="DiabetesPedigreeFunction"
            className="form-input"
            type="number"
            step="0.01"
            name="DiabetesPedigreeFunction"
            value={form.DiabetesPedigreeFunction}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="Age">
            Age
          </label>
          <input
            id="Age"
            className="form-input"
            type="number"
            name="Age"
            value={form.Age}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="heart_disease">
            Heart disease (0 = non, 1 = oui)
          </label>
          <select
            id="heart_disease"
            className="form-select"
            name="heart_disease"
            value={form.heart_disease}
            onChange={handleChange}
          >
            <option value="0">0 - Non</option>
            <option value="1">1 - Oui</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="hypertension">
            Hypertension (0 = non, 1 = oui)
          </label>
          <select
            id="hypertension"
            className="form-select"
            name="hypertension"
            value={form.hypertension}
            onChange={handleChange}
          >
            <option value="0">0 - Non</option>
            <option value="1">1 - Oui</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="HbA1c_level">
            HbA1c level
          </label>
          <input
            id="HbA1c_level"
            className="form-input"
            type="number"
            step="0.1"
            name="HbA1c_level"
            value={form.HbA1c_level}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            className="form-select"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="smoking_status">
            Smoking status
          </label>
          <select
            id="smoking_status"
            className="form-select"
            name="smoking_status"
            value={form.smoking_status}
            onChange={handleChange}
          >
            <option value="never">Never</option>
            <option value="former">Former</option>
            <option value="current">Current</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Prédiction en cours..." : "Prédire"}
        </button>
      </form>
    </div>
  );
}
