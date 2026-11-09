import { useRef, useState, type PointerEvent } from 'react';
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
  const [swiped, setSwiped] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('button') && !target.closest('.task-description')) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    suppressClick.current = false;
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      setSwiped(dx < 0);
    }
  };

  return (
    <article className="relative touch-pan-y overflow-hidden border-b border-[#eff0f4]" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { pointerStart.current = null; }}>
      <button type="button" className="absolute inset-y-0 right-0 z-0 w-[82px] cursor-pointer border-0 bg-[#d54d5a] text-[13px] font-semibold text-white" onClick={() => { setSwiped(false); onDelete(task); }}>Delete</button>
      <div className={`task-row relative z-[1] border-b-0 bg-white px-3 transition-transform duration-200 ${swiped ? '-translate-x-[82px]' : 'translate-x-0'}`}>
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
        onClick={() => { if (suppressClick.current) { suppressClick.current = false; return; } onEdit(task); }}
        className={`task-description${completed ? ' task-description-complete' : ''}`}
      >
        <span className="task-title">{task.title}</span>
        <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-normal leading-[1.35] text-[#858b9b]" title={task.description}>{task.description || 'No description'}</span>
        <span className="task-time">{formatDateTime(task.dueDate)}</span>
      </button>
      <span className={`task-priority flex-none rounded-full px-[7px] py-0.5 text-[10px] font-semibold leading-[1.4] ${task.priority === 'High' ? 'bg-[#fff0f0] text-[#c43e4b]' : task.priority === 'Medium' ? 'bg-[#fff6e5] text-[#9a6400]' : 'bg-[#eef0ff] text-[#3f5de4]'}`}>{task.priority}</span>
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
      </div>
    </article>
  );
}
