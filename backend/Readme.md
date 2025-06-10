## 📘 API Endpoints: GET vs POST (FastAPI)

Understanding how your FastAPI app handles different types of HTTP requests:

### ✅ `@app.get()`
- app.get mean that someone(user) wants to get data from my api and function below defines the behavior on this specific request.
- When someone makes a GET request to /something, FastAPI will run your_function() and return its result."
- No data is sent from the client to the server (except query parameters).
- Common use cases: showing a form, fetching status, listing items.

#### Example:
```python
@app.get("/status")
def check_status():
    return {"status": "API is running!"}

### ✅ `@app.post("/predict")`
- `@app.post()` is used to create an endpoint that accepts **POST requests**, which means the client is **sending data to your API**.
- In this example, the client sends a JSON object containing a list of features.
- The backend uses a trained ML model (`model.pkl`) to make predictions based on the received features.

#### 🔍 How It Works:
```python
@app.post("/predict")
def predict(data: dict):
    features = np.array(data["features"]).reshape(1, -1)
    prediction = model.predict(features)
    return {"prediction": prediction.tolist()}


Middleware:
- Add some nesscary protocols with the incoming request or generated respose for the compatiliblity between backend and frontend.
- It acts like a middle layer between the frontend (client) and the backend (server).


uvicorn:
- Uvicorn is for conitnous reloading of server as cahnges take place.
- uvicorn is to fastapi as nodemon is to expressJs.