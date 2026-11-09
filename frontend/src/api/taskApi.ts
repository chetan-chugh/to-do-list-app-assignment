import { Task, TaskChanges, TaskInput } from '../types/task';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Calls the backend and returns the "data" part of its response
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(BASE_URL + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

export const getTasks = (search = '') =>
  request<Task[]>(`/tasks?search=${encodeURIComponent(search)}`);

export const createTask = (task: TaskInput) =>
  request<Task>('/tasks', { method: 'POST', body: JSON.stringify(task) });

export const updateTask = (id: string, changes: TaskChanges) =>
  request<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(changes) });

export const deleteTask = (id: string) =>
  request<null>(`/tasks/${id}`, { method: 'DELETE' });