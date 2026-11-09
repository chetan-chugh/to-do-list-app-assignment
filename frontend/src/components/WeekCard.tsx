import { ReactNode } from 'react';
import { WeekGroup } from '../types/task';

interface Props {
  week: WeekGroup;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode; // the week's task list, shown when expanded
}

// Summary card for one week. Click it to expand and show that week's tasks.
export default function WeekCard({ week, expanded, onToggle, children }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm outline outline-1 outline-slate-200/80">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent text-left"
      >
        <div>
          <h2 className="font-semibold text-slate-900">
            {week.label}
            {week.isCurrent && (
              <span className="ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                This week
              </span>
            )}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            <span className="font-semibold text-amber-700">{week.open}</span> Open
            <span className="mx-2">·</span>
            <span className="font-semibold text-emerald-700">{week.completed}</span> Completed
          </p>
        </div>
        <span className="text-slate-400">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}
