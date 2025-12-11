import { useState } from "react";
import DiabetesForm from "./components/DiabetesForm";
import PredictionResult from "./components/PredictionResult";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Diabetes Prediction App</h1>
        <p className="app-description">
          Entrez les caractéristiques du patient pour obtenir une estimation du
          risque de diabète basée sur notre modèle de machine learning.
        </p>
      </header>

      <div className="app-content">
        <DiabetesForm onResult={setResult} />
        <PredictionResult result={result} />
      </div>
    </div>
  );
}

export default App;
