# backend/app/services/predictor.py
from pathlib import Path

import joblib
import pandas as pd

from app.core.config import DIABETES_MODEL_PATH
from app.schemas.diabetes import DiabetesFeatures, DiabetesPrediction

# Chargement du modèle au démarrage du serveur
MODEL_PATH: Path = DIABETES_MODEL_PATH

print(f"📦 Chargement du modèle depuis : {MODEL_PATH}")
rf_pipeline = joblib.load(MODEL_PATH)
print("✅ Modèle chargé.")


def predict_diabetes(features: DiabetesFeatures) -> DiabetesPrediction:
    """
    Prend un objet DiabetesFeatures, le transforme en DataFrame,
    appelle le pipeline sklearn, et renvoie un objet DiabetesPrediction.
    """
    # 1) Transformer les features en DataFrame (1 seule ligne)
    data_dict = features.dict()
    input_df = pd.DataFrame([data_dict])

    # 2) Prédiction
    proba_diabetes = float(rf_pipeline.predict_proba(input_df)[:, 1][0])
    predicted_class = int(rf_pipeline.predict(input_df)[0])

    # 3) Petit message d'interprétation (seuil 0.5, tu peux ajuster)
    if proba_diabetes >= 0.5:
        risk_label = "Risque élevé de diabète"
    else:
        risk_label = "Risque faible de diabète (à prendre avec précaution)"

    # 4) Retourner l’objet de sortie
    return DiabetesPrediction(
        predicted_class=predicted_class,
        probability=proba_diabetes,
        risk_label=risk_label,
    )
