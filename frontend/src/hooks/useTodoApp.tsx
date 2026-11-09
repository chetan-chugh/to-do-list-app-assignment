import { useState } from 'react';
import { Task, TaskInput } from '../types/task';
import { useTasks } from './useTasks';
import { useTaskForm } from './useTaskForm';

// All the logic of the app in one place, so App.tsx only has to draw the screen
export function useTodoApp() {
  const { tasks, loading, error, addTask, editTask, toggleStatus, removeTask } =
    useTasks();
  const { formOpen, editingTask, openForm, closeForm } = useTaskForm();
  const [view, setView] = useState<'home' | 'search' | 'weeks'>('home');

  // Create or update (TaskForm shows any error thrown here)
  const handleSave = async (data: TaskInput) => {
    if (editingTask) await editTask(editingTask._id, data);
    else await addTask(data);
    closeForm();
  };

  const handleDelete = async (task: Task) => {
    await removeTask(task);
    closeForm();
  };

  // The three actions every task row needs
  const taskActions = {
    onToggle: toggleStatus,
    onEdit: openForm,
    onDelete: handleDelete,
  };

  return {
    tasks,
    loading,
    error,
    view,
    setView,
    formOpen,
    editingTask,
    openForm,
    closeForm,
    handleSave,
    handleDelete,
    taskActions,
  };
}
