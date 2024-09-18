from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Replace with a specific domain for production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Load the trained model
model = load_model('./deep_learning_model.h5')

# Load the pre-fitted scaler from the file
scaler = joblib.load('scaler.pkl')

# Define a Pydantic model for the input data
class InputData(BaseModel):
    account_size: float
    cost: float
    max_dd: float
    target: float

# Define a function to preprocess input
def preprocess_data(input_data: InputData):
    # Create a NumPy array from the input data
    data = np.array([[input_data.account_size, input_data.cost, input_data.max_dd, input_data.target]])
    
    # Scale the input data using the fitted scaler
    data_scaled = scaler.transform(data)
    
    return data_scaled

# Define the prediction endpoint
@app.post("/predict/")
def predict(data: InputData):
    # Preprocess the input data
    input_data_scaled = preprocess_data(data)
    
    # Make a prediction using the loaded model
    prediction = model.predict(input_data_scaled)
    
    # Return the prediction as a JSON response
    return {"predicted_live": float(prediction[0][0])}

# To run the API, use the following command: `uvicorn filename:app --reload`
