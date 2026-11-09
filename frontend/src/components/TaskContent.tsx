import { Task } from '../types/task';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Weeks from '../pages/Weeks';

export interface TaskActions {
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

interface Props {
  view: 'home' | 'search' | 'weeks';
  loading: boolean;
  tasks: Task[];
  taskActions: TaskActions;
  onViewAll: () => void;
}

// Main area: shows Loading, the Home screen, or the Search screen
export default function TaskContent({ view, loading, tasks, taskActions, onViewAll }: Props) {
  if (loading) {
    return <p className="mt-16 text-center text-slate-500">Loading...</p>;
  }

  if (view === 'search') {
    return <Search tasks={tasks} {...taskActions} />;
  }

  if (view === 'weeks') {
    return <Weeks tasks={tasks} {...taskActions} />;
  }

  return <Home tasks={tasks} {...taskActions} onViewAll={onViewAll} />;
}
