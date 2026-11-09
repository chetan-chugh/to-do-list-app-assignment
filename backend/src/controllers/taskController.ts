import { Request, Response } from 'express';
import Task from '../models/Task';

// GET /api/tasks
// GET /api/tasks?search=abc  (searches title and description)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const search = String(req.query.search || '').trim();

    let filter = {};
    if (search) {
      // Escape special characters so the search text is treated as plain text
      const text = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(text, 'i');
      filter = { $or: [{ title: regex }, { description: regex }] };
    }

    const tasks = await Task.find(filter).sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
};

// POST /api/tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title?.trim() || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Title and date & time are required'
      });
    }

    const task = await Task.create({ title, description, dueDate, priority });

    return res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to create task' });
  }
};

// PUT /api/tasks/:id  (also used to mark a task Completed / In Progress)
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to update task' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
};