import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"
import numpy as np
import joblib
from tensorflow import keras
from config import get_model_path

MODEL_DIR = get_model_path()
MODEL_PATH = MODEL_DIR / "plant_disease_model.h5"
ENCODER_PATH = MODEL_DIR / "label_encoder.pkl"

missing_files = [path for path in (MODEL_PATH, ENCODER_PATH) if not path.exists()]
if missing_files:
    missing = ", ".join(str(path) for path in missing_files)
    raise FileNotFoundError(
        f"Missing model artifact(s): {missing}. "
        "Place plant_disease_model.h5 and label_encoder.pkl in MODEL_DIR."
    )

model = keras.models.load_model(MODEL_PATH)
le = joblib.load(ENCODER_PATH)

def predict(img_array):
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions[0])
    label = le.inverse_transform([class_idx])[0]
    confidence = float(predictions[0][class_idx])
    return label, confidence
