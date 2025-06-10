# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model


# Load model
model = YOLO('./DL/150epoch/best.pt')
# Define image preprocessing pipeline (match what you used during training)

@app.get("/")
def read_root():
    return {"msg": "ML model API is live!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    results = model(image)
    
    # Get the most confident detection
    if len(results[0].boxes) > 0:
        best_box = results[0].boxes[0]  # Boxes are sorted by confidence by default
        return {
            "prediction": model.names[int(best_box.cls)],
            "confidence": (float(best_box.conf)*100),
            "bbox": best_box.xyxy[0].tolist()
        }
    else:
        return {"prediction": "no detections"}
