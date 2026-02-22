🌐 MyPortfolio – Full Stack Personal Portfolio Website

A full-stack personal portfolio website built with Node.js (Express) for the backend and HTML, CSS, Vanilla JavaScript for the frontend.

This project dynamically loads portfolio data (projects, skills, certificates, settings) from JSON files and renders them on the client side.

🚀 Features

🎨 Frontend

Responsive personal portfolio design

Dynamic project listing

Skills section (technical & soft skills)

Certificates section

CV download support

Project images preview

JSON-based dynamic content rendering

Dark mode option

Contact form with email integration

🖥 Backend

Express.js server

Static file serving

API endpoints for JSON data

Clean separation of frontend and backend

🛠 Tech Stack

Frontend

HTML5

CSS3

Vanilla JavaScript (ES6)

Backend

Node.js

Express.js

📂 Project Structure

MyPortfolio/

│

├── backend/

│   ├── server.js

│   ├── package.json

│   └── node_modules/

│

├── frontend/

│   ├── index.html

│   ├── script.js

│   ├── style.css

│   ├── projects.json

│   ├── technicalSkills.json

│   ├── softSkills.json

│   ├── certificates.json

│   ├── settings.json

│   ├── portfolioProject.png

│   ├── retroSnakeProject.png

│   └── selin-cv.pdf

│

└── README.md

🧠 How It Works

The Express backend serves frontend files.

JSON files store dynamic content:

Projects

Technical skills

Soft skills

Certificates

Settings

The frontend fetches this data and renders sections dynamically.

Images and CV file are served as static assets.


⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/yselinturkdogan/MyPortwolio.git
2️⃣ Navigate to Backend Folder

cd MyPortfolio/backend

3️⃣ Install Dependencies

npm install

4️⃣ Start the Server

node server.js

Server will run at:

http://localhost:3000

📌 Data-Driven Design

Instead of hardcoding content into HTML, this project uses structured JSON files to manage:

Projects

Skills

Certificates

General settings

This makes the portfolio easily maintainable and scalable.
