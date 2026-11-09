import { Schema, model } from 'mongoose';

export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'In Progress' | 'Completed';

export interface ITask {
  title: string;
  description: string;
  dueDate: Date; // date & time the task is scheduled for
  priority: Priority;
  status: Status;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: { type: String, trim: true, default: '' },
    dueDate: {
      type: Date,
      required: [true, 'Date & time is required'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed'],
      default: 'In Progress',
    },
  },
  { timestamps: true }
);

export default model<ITask>('Task', taskSchema);
