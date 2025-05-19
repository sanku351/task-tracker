import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';

export const getTasks = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) {
      return res.status(403).json({ message: 'Not authorized to view tasks for this project' });
    }

    const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project, user: req.user.id });
    if (!project) return res.status(403).json({ message: 'Not authorized to access this task' });

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });
    if (!project) return res.status(403).json({ message: 'Not authorized to add task to this project' });

    const { title, description, status } = req.body;

    const task = new Task({
      project: req.params.projectId,
      title,
      description,
      status: status || 'pending',
      completedAt: status === 'completed' ? new Date() : null,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project, user: req.user.id });
    if (!project) return res.status(403).json({ message: 'Not authorized to update this task' });

    const { title, description, status } = req.body;
    const completedAt =
      status === 'completed' && task.status !== 'completed'
        ? new Date()
        : status !== 'completed'
        ? null
        : task.completedAt;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, completedAt },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const project = await Project.findOne({ _id: task.project, user: req.user.id });
    if (!project) return res.status(403).json({ message: 'Not authorized to delete this task' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
