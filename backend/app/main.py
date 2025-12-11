from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.diabetes import DiabetesFeatures, DiabetesPrediction
from app.services.predictor import predict_diabetes

app = FastAPI(
    title="Diabetes Prediction API",
    description="API FastAPI qui expose un modèle de prédiction de diabète.",
    version="1.0.0",
)

# 👇 IMPORTANT : origines autorisées (frontend Vite)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # on autorise explicitement ces origines
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}


@app.post("/predict-diabetes", response_model=DiabetesPrediction, tags=["prediction"])
def predict_diabetes_endpoint(payload: DiabetesFeatures):
    prediction = predict_diabetes(payload)
    return prediction
