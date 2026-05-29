import os
import pickle
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_model.h5")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

model = None
le = None

if os.path.exists(MODEL_PATH):
    model = tf.keras.models.load_model(MODEL_PATH)

if os.path.exists(ENCODER_PATH):
    with open(ENCODER_PATH, "rb") as f:
        le = pickle.load(f)