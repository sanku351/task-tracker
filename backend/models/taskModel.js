import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['todo', 'in progress', 'completed'], 
    default: 'todo' 
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
