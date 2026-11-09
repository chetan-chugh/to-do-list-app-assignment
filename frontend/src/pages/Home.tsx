import { useMemo, useState } from 'react';
import { Task } from '../types/task';
import TaskItem from '../components/TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onViewAll: () => void;
}

const startOfWeek = (date: Date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  start.setHours(0, 0, 0, 0);
  return start;
};

const sameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export default function Home({ tasks, onToggle, onEdit, onDelete, onViewAll }: Props) {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const weekDays = useMemo(() => {
    const monday = startOfWeek(today);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  }, [today]);

  const thisWeekTasks = tasks.filter((task) =>
    weekDays.some((date) => sameDay(new Date(task.dueDate), date))
  );
  const completedCount = thisWeekTasks.filter((task) => task.status === 'Completed').length;
  const pendingCount = thisWeekTasks.length - completedCount;
  const completion = thisWeekTasks.length
    ? Math.round((completedCount / thisWeekTasks.length) * 100)
    : 0;
  const selectedTasks = tasks
    .filter((task) => sameDay(new Date(task.dueDate), selectedDate))
    .sort((first, second) => new Date(first.dueDate).getTime() - new Date(second.dueDate).getTime());
  const isToday = sameDay(selectedDate, today);
  const dayLabel = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <main className="dashboard">
      <section aria-label="Select a day" className="day-strip">
        {weekDays.map((date) => {
          const selected = sameDay(date, selectedDate);
          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={selected}
              onClick={() => setSelectedDate(date)}
              className={`day-option${selected ? ' day-option-selected' : ''}`}
            >
              <span>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span>{date.getDate().toString().padStart(2, '0')}</span>
            </button>
          );
        })}
      </section>

      <section aria-label="This week's task summary" className="summary-grid">
        <article className="summary-card summary-complete">
          <div className="summary-label">
            <span className="summary-icon" aria-hidden="true">✓</span>
            <span>Task Complete</span>
          </div>
          <div className="summary-count">
            {completedCount.toString().padStart(2, '0')}
            <span className="whitespace-nowrap">This Week</span>
          </div>
        </article>
        <article className="summary-card summary-pending">
          <div className="summary-label">
            <span className="summary-icon" aria-hidden="true">×</span>
            <span>Task Pending</span>
          </div>
          <div className="summary-count">
            {pendingCount.toString().padStart(2, '0')}
            <span className="whitespace-nowrap">This Week</span>
          </div>
        </article>
      </section>

      <section className="progress-section" aria-label="Weekly progress">
        <div className="section-heading">
          <h2>Weekly Progress</h2>
          <span>{completion}%</span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Weekly task completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completion}
        >
          <span style={{ width: `${completion}%` }} />
        </div>
      </section>

      <section className="tasks-section">
        <div className="section-heading">
          <h2>{isToday ? 'Tasks Today' : `Tasks ${dayLabel}`}</h2>
          <div className="flex items-center gap-3.5">
            <span className="task-count">{selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'}</span>
            <button type="button" className="cursor-pointer border-0 bg-transparent px-0 py-1 text-xs font-semibold text-[#3f5de4] hover:text-[#253ca9] hover:underline focus-visible:outline-2 focus-visible:outline-[#4563eb] focus-visible:outline-offset-[3px]" onClick={onViewAll}>View All</button>
          </div>
        </div>

        {selectedTasks.length > 0 ? (
          <div className="task-list">
            {selectedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={onToggle}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-tasks">
            <span className="empty-check" aria-hidden="true">✓</span>
            <p>{isToday ? 'Nothing planned for today' : `No tasks for ${dayLabel}`}</p>
            <span>Add a task to keep your day on track.</span>
          </div>
        )}
      </section>
    </main>
  );
}
