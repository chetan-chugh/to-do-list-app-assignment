export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'In Progress' | 'Completed';

// A task as returned by the API
export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  priority: Priority;
  status: Status;
}

// What the form sends when creating or editing a task
export interface TaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

// Any field can be changed on update (status is changed by the tick button)
export type TaskChanges = Partial<TaskInput & { status: Status }>;

// One week card on the home screen
export interface WeekGroup {
  key: number; // timestamp of that week's Monday
  label: string; // e.g. "Nov 2 – Nov 8"
  isCurrent: boolean;
  tasks: Task[];
  open: number;
  completed: number;
}
