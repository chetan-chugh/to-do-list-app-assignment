import { useState } from 'react';
import { Task } from '../types/task';

// Controls whether the task form is open, and which task it is editing
export function useTaskForm() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // null = new task

  const openForm = (task: Task | null = null) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  return { formOpen, editingTask, openForm, closeForm };
}