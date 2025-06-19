// const express = require('express');
// const { spawn } = require('child_process');
// const app = express();
// const path = require('path');
// const port = process.env.PORT || 3000;
// const mongoose = require('mongoose');
// require('./config');

// // const product = require('./content');

// const templetepath = path.join(__dirname,'view');

// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname,'public')))
// app.set("view engine","ejs");
// app.set("views",templetepath);

// app.get("/",(req, res)=>{

//     const quotes = [
//         "Push yourself because no one else is going to do it for you.",
//         "Success starts with self-discipline.",
//         "The body achieves what the mind believes.",
//         "Fitness is not about being better than someone else. It’s about being better than you used to be.",
//         "Some people want it to happen, some wish it would happen, others make it happen",
//         "Don’t limit your challenges. Challenge your limits.",
//         "You don’t have to be extreme, just consistent.",
//         "When you feel like quitting, remember why you started.",
//         "Train insane or remain the same.",
//         "No pain, no gain. Shut up and train."
//     ];

//     // Change quote daily based on the current day
//     const today = new Date().getDate();
//     const dailyQuote = quotes[today % quotes.length];

//     res.render("index", { quote: dailyQuote });

//     // res.render("index");
// });

// app.get('/dumblecurles', (req, res) => {
//   const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject.py')]);

//   pythonProcess.stdout.on('data', (data) => {
//     console.log(`Python Script Output: ${data}`);
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Python Script Error: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     console.log(`Python Script Exited with Code: ${code}`);
//     res.render('index');
//   });
// });

// app.get('/squats', (req, res) => {
//   const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject2.py')]);

//   pythonProcess.stdout.on('data', (data) => {
//     console.log(`Python Script Output: ${data}`);
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Python Script Error: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     console.log(`Python Script Exited with Code: ${code}`);
//     res.render('index');
//   });
// });

// app.get('/over_dumble_curls', (req, res) => {
//   const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject3.py')]);

//   pythonProcess.stdout.on('data', (data) => {
//     console.log(`Python Script Output: ${data}`);
//   });

//   pythonProcess.stderr.on('data', (data) => {
//     console.error(`Python Script Error: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     console.log(`Python Script Exited with Code: ${code}`);
//     res.render('index');
//   });
// });


// const FitAi = require('./content'); // Already imported

// // Render the form
// app.get('/register', (req, res) => {
//   res.render('form');
// });

// // Handle form submission
// app.post('/register', async (req, res) => {
//   try {
//     const newUser = new FitAi({
//       _id: new mongoose.Types.ObjectId(),
//       username: req.body.username,
//       password: req.body.password,
//       Name: req.body.Name,
//       Age: req.body.Age,
//       Height: req.body.Height,
//       Weight: req.body.Weight,
//       BMI: req.body.BMI,
//       ExerciseName: req.body.ExerciseName,
//       StepCount: req.body.StepCount
//     });    

//     await newUser.save();
//     console.log('User saved:', newUser);
//     res.redirect('/'); // redirect to home or success page
//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.status(500).send('Error saving data');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const { spawn } = require('child_process');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
require('./config');

const templetepath = path.join(__dirname,'view');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if using HTTPS
}));

// View engine setup
app.set("view engine","ejs");
app.set("views",templetepath);

// Routes
app.get("/",(req, res)=>{
    const quotes = [
        "Push yourself because no one else is going to do it for you.",
        "Success starts with self-discipline.",
        "The body achieves what the mind believes.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "Some people want it to happen, some wish it would happen, others make it happen",
        "Don't limit your challenges. Challenge your limits.",
        "You don't have to be extreme, just consistent.",
        "When you feel like quitting, remember why you started.",
        "Train insane or remain the same.",
        "No pain, no gain. Shut up and train."
    ];

    const today = new Date().getDate();
    const dailyQuote = quotes[today % quotes.length];

    res.render("index", { quote: dailyQuote });
});

// Exercise form route
app.get('/exercise-form/:exercise', (req, res) => {
  const exercise = req.params.exercise;
  res.render('exercise-form', { exercise });
});

// In your /start-exercise route
app.post('/start-exercise', async (req, res) => {
    try {
        const { username, name, height, weight, exercise } = req.body;
        
        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Store the user data in session
        req.session.exerciseData = {
            username,
            name,
            height,
            weight,
            bmi,
            exercise,
            startTime: new Date()
        };
        
        res.redirect(`/${exercise}`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error starting exercise');
    }
});

// Calorie data (average calories per rep)
const exerciseCalories = {
    'dumblecurles': 0.25,       // 0.25 calories per bicep curl
    'squats': 0.32,             // 0.32 calories per squat
    'over_dumble_curls': 0.28   // 0.28 calories per overhead curl
};

// Update your exercise-summary route
app.get('/exercise-summary', async (req, res) => {
    const exerciseData = req.session.exerciseData || {};
    const stepCount = parseFloat(req.query.steps) || 0;
    
    try {
        if (exerciseData.username) {
            // Calculate calories burned
            const caloriesBurned = (exerciseCalories[exerciseData.exercise] * stepCount).toFixed(1);
            
            const newWorkout = new FitAi({
                username: exerciseData.username,
                Name: exerciseData.name,
                Height: exerciseData.height,
                Weight: exerciseData.weight,
                BMI: exerciseData.bmi,
                ExerciseName: exerciseData.exercise,
                StepCount: stepCount,
                CaloriesBurned: caloriesBurned,
                workoutDate: new Date()
            });
            
            await newWorkout.save();
            console.log('Workout saved with calories data');
        }
        
        res.render('exercise-summary', {
            userData: exerciseData,
            stepCount: stepCount,
            caloriesBurned: (exerciseCalories[exerciseData.exercise] * stepCount).toFixed(1)
        });
    } catch (err) {
        console.error('Error saving workout:', err);
        res.status(500).send('Error saving workout data');
    }
});

// Exercise routes
app.get('/dumblecurles', (req, res) => {
  if (!req.session.exerciseData) {
    return res.redirect('/exercise-form/dumblecurles');
  }

  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject.py')]);
  let stepCount = 0;

  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`Python Script Output: ${output}`);
    
    // Extract the final count from the output
    const lines = output.split('\n');
    const lastLine = lines[lines.length - 1];
    if (lastLine.includes('final count is')) {
      stepCount = lastLine.match(/\d+/)[0];
    } else if (!isNaN(parseFloat(lastLine))) {
      stepCount = parseFloat(lastLine);
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.redirect(`/exercise-summary?steps=${stepCount}`);
  });
});

app.get('/squats', (req, res) => {
  if (!req.session.exerciseData) {
    return res.redirect('/exercise-form/squats');
  }

  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject2.py')]);
  let stepCount = 0;

  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`Python Script Output: ${output}`);
    
    const lines = output.split('\n');
    const lastLine = lines[lines.length - 1];
    if (lastLine.includes('final count is')) {
      stepCount = lastLine.match(/\d+/)[0];
    } else if (!isNaN(parseFloat(lastLine))) {
      stepCount = parseFloat(lastLine);
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.redirect(`/exercise-summary?steps=${stepCount}`);
  });
});

app.get('/over_dumble_curls', (req, res) => {
  if (!req.session.exerciseData) {
    return res.redirect('/exercise-form/over_dumble_curls');
  }

  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject3.py')]);
  let stepCount = 0;

  pythonProcess.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`Python Script Output: ${output}`);
    
    const lines = output.split('\n');
    const lastLine = lines[lines.length - 1];
    if (lastLine.includes('final count is')) {
      stepCount = lastLine.match(/\d+/)[0];
    } else if (!isNaN(parseFloat(lastLine))) {
      stepCount = parseFloat(lastLine);
    }
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.redirect(`/exercise-summary?steps=${stepCount}`);
  });
});

// Registration routes
const FitAi = require('./content');

app.get('/register', (req, res) => {
  res.render('form');
});

app.post('/register', async (req, res) => {
  try {
    const newUser = new FitAi({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: req.body.password,
      Name: req.body.Name,
      Age: req.body.Age,
      Height: req.body.Height,
      Weight: req.body.Weight,
      BMI: req.body.BMI,
      ExerciseName: req.body.ExerciseName,
      StepCount: req.body.StepCount
    });    

    await newUser.save();
    console.log('User saved:', newUser);
    res.redirect('/');
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving data');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});