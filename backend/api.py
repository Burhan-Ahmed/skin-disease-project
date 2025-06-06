# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import joblib
import numpy as np

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("model.pkl")

@app.get("/")
def read_root():
    return {"msg": "ML model API is live!"}

@app.post("/predict")
def predict(data: dict):
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": prediction.tolist()}
