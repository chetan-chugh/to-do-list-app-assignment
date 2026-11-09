import { Task } from '../types/task';
import { formatDateTime } from '../utils/date';

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const completed = task.status === 'Completed';

  return (
    <article className="task-row">
      <button
        type="button"
        aria-label={completed ? 'Mark as in progress' : 'Mark as completed'}
        aria-pressed={completed}
        onClick={() => onToggle(task)}
        className={`task-checkbox${completed ? ' task-checkbox-checked' : ''}`}
      >
        {completed && <span aria-hidden="true">✓</span>}
      </button>
      <button
        type="button"
        onClick={() => onEdit(task)}
        className={`task-description${completed ? ' task-description-complete' : ''}`}
      >
        <span className="task-title">{task.title}</span>
        <span className="task-time">{formatDateTime(task.dueDate)}</span>
      </button>
      <div className="task-actions">
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
          className="task-action-button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          className="task-action-button"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14 5 5 5M4 20l4.3-.9L19 8.4a2.1 2.1 0 0 0-3-3L5.3 16.1 4 20Z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
