# Task Tracker App
A full-stack task management application built with a Node.js/Express backend and a React (Vite) frontend. Users can sign up, log in, create and manage projects and tasks, and track their progress in real time.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
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
![Screenshot 2025-05-19 224323](https://github.com/user-attachments/assets/5b3fc605-6f0d-4e55-96c5-1fbbe2bda9f0)

## Screenshots
![Home](https://github.com/user-attachments/assets/68b1ab2f-41a9-407b-8441-4b117806bdd0)
![LoginForm](https://github.com/user-attachments/assets/62d88659-2702-4b57-af60-18bbe6dbb7d9)
![SignupForm](https://github.com/user-attachments/assets/79b71042-9cba-4c1f-9175-09445f6ed453)
![Dashboard](https://github.com/user-attachments/assets/5db88994-e6fc-43b3-a815-1f761e4c0a49)
![Create New](https://github.com/user-attachments/assets/013b5496-0248-4642-95c7-0cbbb6b66242)
![View Tasks](https://github.com/user-attachments/assets/e1f3f7ca-4e49-477e-a311-cb9932a9e7e5)

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
```
MIT License

Copyright (c) 2025 sanku351

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
