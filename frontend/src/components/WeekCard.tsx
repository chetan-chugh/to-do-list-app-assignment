import { ReactNode, useEffect, useRef } from 'react';
import { WeekGroup } from '../types/task';

interface Props {
  week: WeekGroup;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode; // the week's task list, shown when expanded
}

// Summary card for one week. Click it to expand and show that week's tasks.
export default function WeekCard({ week, expanded, onToggle, children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.toggleAttribute('inert', !expanded);
  }, [expanded]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm outline outline-1 outline-slate-200/80">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={`week-content-${week.key}`}
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
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`week-card-chevron h-5 w-5 flex-none text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        ref={contentRef}
        id={`week-content-${week.key}`}
        className={`week-card-content${expanded ? ' is-expanded' : ''}`}
        aria-hidden={!expanded}
      >
        <div className="week-card-content-inner space-y-3">{children}</div>
      </div>
    </div>
  );
}
