import { Task, WeekGroup } from '../types/task';

const pad = (n: number): string => String(n).padStart(2, '0');

// Monday 00:00 of the week that contains the given date (weeks run Mon–Sun)
function getWeekStart(date: string | Date): Date {
  const d = new Date(date);
  const daysSinceMonday = (d.getDay() + 6) % 7; // Sunday(0) -> 6, Monday(1) -> 0
  d.setDate(d.getDate() - daysSinceMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

const shortDate = (d: Date): string =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// Turns a flat task list into week cards, newest week first
export function groupByWeek(tasks: Task[]): WeekGroup[] {
  const groups: Record<number, WeekGroup> = {};
  const currentWeekKey = getWeekStart(new Date()).getTime();

  tasks.forEach((task) => {
    const start = getWeekStart(task.dueDate);
    const key = start.getTime();

    if (!groups[key]) {
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      groups[key] = {
        key,
        label: `${shortDate(start)} – ${shortDate(end)}`,
        isCurrent: key === currentWeekKey,
        tasks: [],
        open: 0,
        completed: 0,
      };
    }

    groups[key].tasks.push(task);
    if (task.status === 'Completed') groups[key].completed += 1;
    else groups[key].open += 1;
  });

  return Object.values(groups).sort((a, b) => b.key - a.key);
}

// "Mon, Nov 9, 3:30 PM"
export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// ISO string -> value for <input type="datetime-local"> (in local time)
export function toInputValue(date: string): string {
  const d = new Date(date);
  const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return `${day}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
