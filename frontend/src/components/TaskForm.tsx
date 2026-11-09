import { FormEvent, useState } from 'react';
import { Priority, Task, TaskInput } from '../types/task';
import { toInputValue } from '../utils/date';

const getLocalDateValue = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

interface Props {
  task: Task | null; // null = creating a new task
  onSave: (data: TaskInput) => Promise<void>;
  onDelete: (task: Task) => void;
  onClose: () => void;
}

// Form used for both creating and editing a task
export default function TaskForm({ task, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [dateTime, setDateTime] = useState(task ? toInputValue(task.dueDate) : '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !dateTime) {
      setError('Title and date & time are required');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dateTime).toISOString(),
        priority,
      });
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15';

  return (
    <div className="fixed inset-0 z-20 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-[2px] sm:items-center sm:p-5">
      <form
        onSubmit={handleSubmit}
        className="max-h-[92dvh] w-full max-w-lg space-y-4 overflow-y-auto rounded-t-3xl bg-white p-5 text-slate-900 shadow-2xl sm:rounded-2xl sm:p-7"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="task-form-close"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Task title *</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Description</label>
          <textarea
            className={inputClass}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Due date *</label>
            <input
              type="date"
              className={inputClass}
              value={dateTime.slice(0, 10)}
              onChange={(e) => setDateTime(`${e.target.value}T${dateTime.slice(11) || '09:00'}`)}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Due time *</label>
            <input
              type="time"
              className={inputClass}
              value={dateTime.slice(11, 16)}
              onChange={(e) => setDateTime(`${dateTime.slice(0, 10) || getLocalDateValue()}T${e.target.value}`)}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-500">Priority</label>
          <select
            className={inputClass}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {error && <p className="text-sm text-rose-700">{error}</p>}

        <div className="flex gap-3">
          {task && (
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
            >
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={saving}
            className="task-form-submit flex-1 rounded-lg py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : task ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  );
}