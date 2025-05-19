import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// GET    /api/projects          -> list all for user
router.get('/', authenticateToken, getProjects);

// POST   /api/projects          -> create new
router.post('/', authenticateToken, createProject);

// GET    /api/projects/:id      -> get one
router.get('/:id', authenticateToken, getProjectById);

// PUT    /api/projects/:id      -> update one
router.put('/:id', authenticateToken, updateProject);

// DELETE /api/projects/:id      -> delete one (and its tasks)
router.delete('/:id', authenticateToken, deleteProject);

export default router;
