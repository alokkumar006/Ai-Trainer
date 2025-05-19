const mongoose = require('mongoose');

// Define the schema
const customerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    Name: { type: String, required: true },
    Age: { type: Number },
    Height: { type: Number },
    Weight: { type: Number },
    BMI: { type: Number },
    ExerciseName: { type: String },
    StepCount: { type: Number }
  }, { collection: 'CustData' });
  

// Create the model
const FitAi = mongoose.model('FitAi', customerSchema);

module.exports = FitAi;
