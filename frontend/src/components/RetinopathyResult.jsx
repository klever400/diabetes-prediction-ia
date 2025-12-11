export default function RetinopathyResult({ result }) {
  if (!result) {
    return (
      <div className="card">
        <div className="result-empty">
          <div className="result-empty-icon">👁️</div>
          <div className="result-empty-text">En attente d'analyse</div>
          <div className="result-empty-subtext">
            Uploadez une image d'œil et cliquez sur "Analyser l'image" pour voir
            les résultats
          </div>
        </div>
      </div>
    );
  }

  const { predicted_class, confidence, classes, model_name } = result;
  const confPercent = (confidence * 100).toFixed(1);

  // Mapping des classes vers des labels français
  const classLabels = {
    no_dr: "Pas de rétinopathie",
    mild: "Rétinopathie légère",
    moderate: "Rétinopathie modérée",
    severe: "Rétinopathie sévère",
    proliferative: "Rétinopathie proliférative",
  };

  // Couleurs selon la sévérité
  const getSeverityColor = (class_name) => {
    switch (class_name) {
      case "no_dr":
        return "severity-none";
      case "mild":
        return "severity-mild";
      case "moderate":
        return "severity-moderate";
      case "severe":
        return "severity-severe";
      case "proliferative":
        return "severity-proliferative";
      default:
        return "";
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Résultat de l'analyse</h2>

      <div className="result-content">
        <div className="result-header">
          <div className="result-model">Modèle : {model_name}</div>
          <div className={`result-prediction ${getSeverityColor(predicted_class)}`}>
            {classLabels[predicted_class] || predicted_class}
          </div>
        </div>

        <div className="result-details">
          <div className="result-item">
            <div className="result-item-label">Stade prédit</div>
            <div className="result-item-value">
              {predicted_class} - {classLabels[predicted_class]}
            </div>
          </div>

          <div className="result-item">
            <div className="result-item-label">Confiance</div>
            <div className="result-item-value">{confPercent} %</div>
          </div>
        </div>

        <div className="result-classes">
          <div className="result-classes-label">Stades possibles :</div>
          <div className="result-classes-list">
            {classes.map((cls) => (
              <span
                key={cls}
                className={`result-class-badge ${
                  cls === predicted_class ? "active" : ""
                }`}
              >
                {cls}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

