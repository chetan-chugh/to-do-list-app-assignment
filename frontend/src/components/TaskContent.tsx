import { Task } from '../types/task';
import Home from '../pages/Home';
import Search from '../pages/Search';

export interface TaskActions {
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

interface Props {
  view: 'home' | 'search';
  loading: boolean;
  tasks: Task[];
  taskActions: TaskActions;
}

// Main area: shows Loading, the Home screen, or the Search screen
export default function TaskContent({ view, loading, tasks, taskActions }: Props) {
  if (loading) {
    return <p className="mt-16 text-center text-slate-500">Loading...</p>;
  }

  if (view === 'search') {
    return <Search tasks={tasks} {...taskActions} />;
  }

  return <Home tasks={tasks} {...taskActions} />;
}