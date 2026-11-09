import { useState } from 'react';
import { Task } from '../types/task';
import TaskItem from '../components/TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function Search({ tasks, onToggle, onEdit, onDelete }: Props) {
  const [query, setQuery] = useState('');

  // Keep the tasks whose title or description contain the typed keyword
  const keyword = query.trim().toLowerCase();
  const results = keyword
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(keyword) ||
          task.description.toLowerCase().includes(keyword)
      )
    : [];

  return (
    <div className="w-full">
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search tasks by title or description"
        placeholder="Search by title or description"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15"
      />

      <div className="mt-4 space-y-3">
        {results.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {keyword && results.length === 0 && (
        <section className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">
          <div
            aria-hidden="true"
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-900"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m16 16 4 4" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900">No matching tasks</h2>
          <p className="mt-1 max-w-md break-words text-sm leading-6 text-slate-600">
            We couldn’t find a task matching “{query.trim()}”. Try another search term.
          </p>
        </section>
      )}
    </div>
  );
}