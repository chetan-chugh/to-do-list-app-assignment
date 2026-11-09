import { useEffect, useState } from 'react';
import * as api from '../api/taskApi';
import { Task, TaskChanges, TaskInput } from '../types/task';

// Holds the task list and every action that changes it
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setTasks(await api.getTasks());
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
    setLoading(false);
  };

  // Load the tasks once when the app opens
  useEffect(() => {
    loadTasks();
  }, []);

  // add/edit throw on failure so the form can show the error message
  const addTask = async (input: TaskInput) => {
    await api.createTask(input);
    await loadTasks();
  };

  const editTask = async (id: string, changes: TaskChanges) => {
    await api.updateTask(id, changes);
    await loadTasks();
  };

  // toggle/remove show the error at the top of the page instead
  const toggleStatus = async (task: Task) => {
    const status = task.status === 'Completed' ? 'In Progress' : 'Completed';
    try {
      await editTask(task._id, { status });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const removeTask = async (task: Task) => {
    try {
      await api.deleteTask(task._id);
      await loadTasks();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { tasks, loading, error, addTask, editTask, toggleStatus, removeTask };
}