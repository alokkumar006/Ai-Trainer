const express = require('express');
const { spawn } = require('child_process');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('./config');

// const product = require('./content');

const templetepath = path.join(__dirname,'view');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine","ejs");
app.set("views",templetepath);

app.get("/",(req, res)=>{
    res.render("index");
});

app.get('/dumblecurles', (req, res) => {
  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject.py')]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.render('index');
  });
});

app.get('/squats', (req, res) => {
  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject2.py')]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.render('index');
  });
});

app.get('/over_dumble_curls', (req, res) => {
  const pythonProcess = spawn('python', [path.join(__dirname, 'python', 'AiTrainerProject3.py')]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Script Output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Script Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python Script Exited with Code: ${code}`);
    res.render('index');
  });
});


const FitAi = require('./content'); // Already imported

// Render the form
app.get('/register', (req, res) => {
  res.render('form');
});

// Handle form submission
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
    res.redirect('/'); // redirect to home or success page
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).send('Error saving data');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
