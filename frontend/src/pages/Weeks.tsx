import { useMemo, useState } from 'react';
import { Task } from '../types/task';
import { groupByWeek } from '../utils/date';
import WeekCard from '../components/WeekCard';
import TaskItem from '../components/TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function Weeks({ tasks, onToggle, onEdit, onDelete }: Props) {
  const weeks = useMemo(() => groupByWeek(tasks), [tasks]);
  const currentWeek = weeks.find((week) => week.isCurrent)?.key;
  const [expandedWeek, setExpandedWeek] = useState<number | null>(currentWeek ?? null);

  return (
    <main className="grid gap-3.5" aria-label="Tasks by week">
      {weeks.length ? weeks.map((week) => (
        <WeekCard
          key={week.key}
          week={week}
          expanded={expandedWeek === week.key}
          onToggle={() => setExpandedWeek((current) => current === week.key ? null : week.key)}
        >
          {week.tasks
            .slice()
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
            .map((task) => <TaskItem key={task._id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}
        </WeekCard>
      )) : (
        <div className="px-4 py-10 text-center text-[#747b8e]">No tasks scheduled yet.</div>
      )}
    </main>
  );
}
