# to-do-app (TAMID MINI PROJECT)
A simple to-do list app that you can add too, mark tasks complete, and delete tasks that runs on localhost and utilizes CRUD APIs. 

## Features
- Add tasks with descriptions
- Mark tasks as complete (crossed out, button disabled)
- Delete tasks
- In-memory storage (no database)

## Tech Stack
- Frontend: HTML, CSS, JavaScript  
- Backend: Node.js, Express, CORS  

## File Structure
todo-app/
├── backend/
│ └── server.js # Express REST API
├── frontend/
│ ├── index.html # UI
│ └── script.js # API calls + DOM updates
└── package.json # Dependencies and scripts

## Setup
- Clone the repo
- Install dependencies (npm install express cors)
- Start the backend (node backend/server.js)
- Open the frontend (frontend/index.html in browser or use Live Server in VS Code)

## Notes
- Tasks are stored only in memory
- Complete button disables once clicked
- With more time, improvements may include:
    - Improved styling
    - Authentication such as a log in
    - Persistent storage to save tasks 

## Author
Healy Levy-Yurista
