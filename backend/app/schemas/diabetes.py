from pydantic import BaseModel, Field
from typing import Optional


class DiabetesFeatures(BaseModel):
    # 🔢 Variables numériques Pima-like
    Pregnancies: int = Field(..., ge=0)
    Glycemia_gL: float = Field(..., gt=0)
    BloodPressure: float = Field(..., ge=0)
    SkinThickness: float = Field(..., ge=0)
    Insulin: float = Field(..., ge=0)
    BMI: float = Field(..., gt=0)
    DiabetesPedigreeFunction: float = Field(..., ge=0)
    Age: int = Field(..., ge=0)

    # 🔢 Nouveaux attributs du dataset fusionné
    heart_disease: int = Field(..., ge=0, le=1, description="0 = non, 1 = oui")
    hypertension: int = Field(..., ge=0, le=1, description="0 = non, 1 = oui")
    HbA1c_level: float = Field(..., ge=0, description="Taux HbA1c")

    # 🔠 Catégorielles
    gender: str = Field(..., description="Ex: 'Male', 'Female'")
    smoking_status: str = Field(..., description="Ex: 'never', 'former', 'current'")

    class Config:
        json_schema_extra = {
            "example": {
                "Pregnancies": 2,
                "Glycemia_gL": 1.2,
                "BloodPressure": 80,
                "SkinThickness": 25,
                "Insulin": 100,
                "BMI": 28.5,
                "DiabetesPedigreeFunction": 0.45,
                "Age": 35,
                "heart_disease": 0,
                "hypertension": 0,
                "HbA1c_level": 5.6,
                "gender": "Female",
                "smoking_status": "never",
            }
        }


class DiabetesPrediction(BaseModel):
    predicted_class: int
    probability: float
    risk_label: str
    model_name: Optional[str] = "RandomForest_pipeline"
