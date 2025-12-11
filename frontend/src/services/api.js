// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictDiabetes(formData) {
  const payload = {
    Pregnancies: Number(formData.Pregnancies),
    Glycemia_gL: Number(formData.Glycemia_gL),
    BloodPressure: Number(formData.BloodPressure),
    SkinThickness: Number(formData.SkinThickness),
    Insulin: Number(formData.Insulin),
    BMI: Number(formData.BMI),
    DiabetesPedigreeFunction: Number(formData.DiabetesPedigreeFunction),
    Age: Number(formData.Age),

    heart_disease: Number(formData.heart_disease),
    hypertension: Number(formData.hypertension),
    HbA1c_level: Number(formData.HbA1c_level),

    gender: formData.gender,
    smoking_status: formData.smoking_status,
  };

  const response = await axios.post(
    `${API_BASE_URL}/predict-diabetes`,
    payload
  );

  return response.data;
}

export async function predictRetinopathy(imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await axios.post(
    `${API_BASE_URL}/predict-retinopathy`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}