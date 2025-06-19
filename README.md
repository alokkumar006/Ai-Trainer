# FIT.AI : Your Personal AI Trainer
Fit.Ai: Setup & User Guide 🏋️‍♂️🤖
Fit.Ai is a web‑based workout feedback system powered by Mediapipe, OpenCV, Node.js, Express, and MongoDB. It helps users perform exercises with real-time visual feedback using AI.


🔧 Prerequisites
Make sure the following are installed on your system:

->Python (recommended ≥ 3.7)
->OpenCV (opencv-python)
->Node.js (16.x or newer) & npm
->Express.js (installed via npm)
->Mediapipe (for Python)
->MongoDB Compass (or another MongoDB GUI)
->Optional: MongoDB community server (if you're self-hosting)


📥 Cloning the Repository
Open a terminal and run:
    git clone https://github.com/alokkumar006/Ai-Trainer.git
    cd Ai-Trainer

🛠 Installing Dependencies
Python (Backend/Inference)
Install the required Python libraries:
    pip install opencv-python mediapipe

Node.js / Express (Server & Frontend)
Install Node modules:
    npm install

🗄 Setting Up the Database
->Launch MongoDB Compass.
->Connect to mongodb://127.0.0.1:27017 (default local instance).
->Create a new database, for example: fit_ai_db.
->You can manually create collections or allow Express to auto-create them upon user registration.


🚀 Running Fit.Ai
From the root of the project directory, start the server:
    node app.js
You should see output similar to:
    Server running on http://localhost:3000
    Connected to MongoDB


🌐 Using Fit.Ai in Your Browser
->Open http://localhost:3000 in your browser.
->Register for an account.
->Log in.
->Start your exercise session. You'll get real-time feedback using your webcam, thanks to OpenCV and Mediapipe.


📝 Key Features
| Feature                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **User Registration**  | Signup/login handled with MongoDB backend              |
| **Real-time Feedback** | Computer vision system powered by Mediapipe and OpenCV |
| **Form Correction**    | Detects user movement and provides corrective cues     |



⚙️ Troubleshooting
->Webcam Not Detected?
    Ensure your browser has permission to access the webcam and it's not being used by another app.
->MongoDB Connection Fails?
    Double-check your database URI in app.js and ensure MongoDB is running.
->Python Errors?
    Run:    pip install opencv-python mediapipe