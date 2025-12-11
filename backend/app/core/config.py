from pathlib import Path

# Ce fichier est dans : backend/app/core/config.py
# On remonte de 3 niveaux pour arriver à la racine du projet :
# core -> app -> backend -> (racine du projet)
BASE_DIR = Path(__file__).resolve().parents[3]

# Dossier des modèles à la racine du projet
MODELS_DIR = BASE_DIR / "models"

# Chemin complet vers le modèle sauvegardé
DIABETES_MODEL_PATH = MODELS_DIR / "diabetes_rf_pipeline.joblib"

# (optionnel) petit print de debug
print("📁 BASE_DIR =", BASE_DIR)
print("📁 MODELS_DIR =", MODELS_DIR)
print("📄 DIABETES_MODEL_PATH =", DIABETES_MODEL_PATH)
