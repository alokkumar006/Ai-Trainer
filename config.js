const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FitAi')
  .then(() => console.log("Database connection to FitAi done"))
  .catch((error) => console.error("Database connection error:", error));
