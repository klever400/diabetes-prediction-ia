import { useState } from "react";
import DiabetesForm from "./components/DiabetesForm";
import PredictionResult from "./components/PredictionResult";
import RetinopathyForm from "./components/RetinopathyForm";
import RetinopathyResult from "./components/RetinopathyResult";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("diabetes"); // "diabetes" ou "retinopathy"
  const [diabetesResult, setDiabetesResult] = useState(null);
  const [retinopathyResult, setRetinopathyResult] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Diabetes Prediction App</h1>
        <p className="app-description">
          Prédiction du diabète et analyse de rétinopathie diabétique basées sur
          l'intelligence artificielle.
        </p>
      </header>

      {/* Onglets de navigation */}
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "diabetes" ? "active" : ""}`}
          onClick={() => setActiveTab("diabetes")}
        >
          📊 Prédiction Diabète (Tabulaire)
        </button>
        <button
          className={`tab-button ${activeTab === "retinopathy" ? "active" : ""}`}
          onClick={() => setActiveTab("retinopathy")}
        >
          👁️ Analyse Rétinopathie (Vision)
        </button>
      </div>

      <div className="app-content">
        {activeTab === "diabetes" ? (
          <>
            <DiabetesForm onResult={setDiabetesResult} />
            <PredictionResult result={diabetesResult} />
          </>
        ) : (
          <>
            <RetinopathyForm onResult={setRetinopathyResult} />
            <RetinopathyResult result={retinopathyResult} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
