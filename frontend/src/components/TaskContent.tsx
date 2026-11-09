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
  tasks: Task[];
  taskActions: TaskActions;
  onViewAll: () => void;
}

// Main area: shows Loading, the Home screen, or the Search screen
export default function TaskContent({ view, tasks, taskActions, onViewAll }: Props) {
  if (view === 'search') {
    return <Search tasks={tasks} {...taskActions} />;
  }

  if (view === 'weeks') {
    return <Weeks tasks={tasks} {...taskActions} />;
  }

  return <Home tasks={tasks} {...taskActions} onViewAll={onViewAll} />;
}
