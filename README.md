# Task Tracker App
A full-stack task management application built with a Node.js/Express backend and a React (Vite) frontend. Users can sign up, log in, create and manage projects and tasks, and track their progress in real time.

## Table of Contents
- [Features](#features)
- [Project Structure](#project)
- [Installation & Setup](#installation)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and login with JWT-based authentication
- Create, read, update, and delete (CRUD) projects
- Within each project, create and manage tasks
- Protected routes for authenticated users
- Real-time updates on task status
- Responsive, modern UI

## Tech Stack
- Frontend: React with Vite
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS Modules / Tailwind (if used)

## Project Structure
/task-tracker-app
├── backend             # Express API server
│   ├── config          # Database setup
│   ├── controllers     # Route handlers
│   ├── middleware      # Auth middleware
│   ├── models          # Mongoose schemas
│   ├── routes          # API routes
│   ├── server.js       # Entry point
│   ├── package.json
│   └── .env            # Environment variables

└── frontend            # React Vite app
    ├── public          # Static assets & index.html
    ├── src             # Source code
    │   ├── pages       # Page components
    │   ├── components  # Reusable UI components
    │   └── lib         # API & utility functions
    ├── package.json
    └── vite.config.js/task-tracker-app

## Installation & Setup
# Backend
- Navigate to the backend folder:
```
cd backend
```
- Install dependencies:
```
npm install
```
Create a `.env` file in backend (see Environment Variables).

# Frontend
- Open a new terminal and navigate to the frontend folder:
```
cd frontend
```
- Install dependencies:
```
npm install
```

# Environment Variables
In `backend/.env:`
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

# Running the App
- Start the backend server:
```
cd backend
```
```
npm run dev
```
Server will run on `http://localhost:5000`
- Start the frontend:
```
cd frontend
```
```
npm run dev
```
App will open in your browser at `http://localhost:3000` (or the port shown).

# API Reference
- POST `/api/auth/register` — Register a new user
- POST `/api/auth/login` — Authenticate and receive a JWT
- GET `/api/projects` — List all projects (protected)
- POST `/api/projects` — Create a new project (protected)
- PUT `/api/projects/:id` — Update a project by ID (protected)
- DELETE `/api/projects/:id` — Delete a project by ID (protected)
- GET `/api/tasks` — List tasks (protected)
- POST `/api/tasks` — Create a new task in a project (protected)
- PUT `/api/tasks/:id` — Update a task by ID (protected)
- DELETE `/api/tasks/:id` — Delete a task by ID (protected)
(Adjust endpoints to match your implementation.)

## Contributing
Fork the repository
Create a feature branch (`git checkout -b feature/YourFeature`)
Commit your changes (`git commit -m "Add Some Feature"`)
Push to the branch (`git push origin feature/YourFeature`)
Open a Pull Request
Please ensure code follows existing style conventions and includes tests when applicable.

## License
This project is licensed under the MIT License.
