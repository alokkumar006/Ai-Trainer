const express = require('express');
const { spawn } = require('child_process');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;


const templetepath = path.join(__dirname,'view');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
console.log("The path is : ",path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')))
app.set("view engine","ejs");
app.set("views",templetepath);


app.get("/",(req, res)=>{
    res.render("index");
});

app.get('/dumblecurles', (req, res) => {
  // const pythonProcess = spawn('python', ["E:\\PoseEstimationProject\\AiTrainerProject.py"]);
  const pythonProcess = spawn('python', ["E:\\Fit-Plus\\PythonModule\\AiTrainerProject.py"]);
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
    // const pythonProcess = spawn('python', ["E:\\poseEstimationProject2\\AiTrainerProject2.py"]);
    const pythonProcess = spawn('python', ["E:\\Fit-Plus\\PythonModule\\AiTrainerProject2.py"]);
  
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
    // const pythonProcess = spawn('python', ["E:\\poseEstimationProject2\\AiTrainerProject3.py"]);
    const pythonProcess = spawn('python', ["E:\\Fit-Plus\\PythonModule\\AiTrainerProject3.py"]);
  
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
