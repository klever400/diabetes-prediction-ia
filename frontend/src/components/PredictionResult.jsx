export default function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="card">
        <div className="result-empty">
          <div className="result-empty-icon">📊</div>
          <div className="result-empty-text">En attente de prédiction</div>
          <div className="result-empty-subtext">
            Remplissez le formulaire et cliquez sur "Prédire" pour voir les
            résultats
          </div>
        </div>
      </div>
    );
  }

  const { predicted_class, probability, risk_label, model_name } = result;
  const probPercent = (probability * 100).toFixed(1);
  const isDiabetic = predicted_class === 1;

  return (
    <div className="card">
      <h2 className="card-title">Résultat de la prédiction</h2>

      <div className="result-content">
        <div className="result-header">
          <div className="result-model">Modèle : {model_name}</div>
          <div
            className={`result-prediction ${
              isDiabetic ? "diabetic" : "non-diabetic"
            }`}
          >
            {isDiabetic ? "Diabétique" : "Non diabétique"}
          </div>
        </div>

        <div className="result-details">
          <div className="result-item">
            <div className="result-item-label">Classe prédite</div>
            <div className="result-item-value">
              {predicted_class === 1 ? "1 - Diabétique" : "0 - Non diabétique"}
            </div>
          </div>

          <div className="result-item">
            <div className="result-item-label">Probabilité (classe 1)</div>
            <div className="result-item-value">{probPercent} %</div>
          </div>
        </div>

        <div className="result-risk">
          <div className="result-risk-label">Interprétation du risque</div>
          <div className="result-risk-value">{risk_label}</div>
        </div>

      </div>
    </div>
  );
}
