import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

// mergeParams to access projectId from parent route
const router = express.Router({ mergeParams: true });

// GET /api/projects/:projectId/tasks
// POST /api/projects/:projectId/tasks
router
  .route('/')
  .get(authenticateToken, getTasks)
  .post(authenticateToken, createTask);

// For operations on individual tasks
// GET /api/projects/:projectId/tasks/:id
// PUT /api/projects/:projectId/tasks/:id
// DELETE /api/projects/:projectId/tasks/:id
router
  .route('/:id')
  .get(authenticateToken, getTaskById)
  .put(authenticateToken, updateTask)
  .delete(authenticateToken, deleteTask);

export default router;
