import React, { useState } from 'react';
import axios from 'axios';

function PredictionForm() {
  const [inputData, setInputData] = useState({
    Location: '',
    Weather: '',
    Road_Surface: '',
    Drug_Alcohol_Use: '',
    City: '',
    Traffic_Control: '',
    Lighting_Condition: '',
    Vehicle_Type: '',
    Vehicles_Involved: 1,
    Casualties: 0,
    Fatalities: 0,
    Speed_Limit: 50
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send the input data to the Flask API for prediction
      const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
      setPrediction(response.data.severity);  // Severity label (Low, Medium, High, Critical)
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Accident Severity Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for each feature */}
        <input
          type="text"
          name="Location"
          value={inputData.Location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="Weather"
          value={inputData.Weather}
          onChange={handleChange}
          placeholder="Weather"
        />
        <input
          type="text"
          name="Road_Surface"
          value={inputData.Road_Surface}
          onChange={handleChange}
          placeholder="Road Surface"
        />
        <select
          name="Drug_Alcohol_Use"
          value={inputData.Drug_Alcohol_Use}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        
        {/* Input fields for numerical data */}
        <input
          type="number"
          name="Vehicles_Involved"
          value={inputData.Vehicles_Involved}
          onChange={handleChange}
          placeholder="Vehicles Involved"
        />
        <input
          type="number"
          name="Casualties"
          value={inputData.Casualties}
          onChange={handleChange}
          placeholder="Casualties"
        />
        <input
          type="number"
          name="Fatalities"
          value={inputData.Fatalities}
          onChange={handleChange}
          placeholder="Fatalities"
        />
        <input
          type="number"
          name="Speed_Limit"
          value={inputData.Speed_Limit}
          onChange={handleChange}
          placeholder="Speed Limit"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {prediction && (
        <div>
          <h3>Predicted Severity: {prediction}</h3>  {/* Display severity label */}
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
