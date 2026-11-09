import { useState } from 'react';
import { Task } from '../types/task';

interface Props {
  task: Task;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteTaskDialog({ task, onCancel, onConfirm }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
  };

  return (
    <div
      className="delete-dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        className="delete-dialog"
      >
        <div className="delete-dialog-icon" aria-hidden="true">!</div>
        <h2 id="delete-dialog-title">Delete this task?</h2>
        <p id="delete-dialog-description">
          Are you sure you want to delete <strong>{task.title}</strong>? This action cannot be undone.
        </p>
        <div className="delete-dialog-actions">
          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="delete-dialog-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={deleting}
            className="delete-dialog-confirm"
          >
            {deleting ? 'Deleting...' : 'Delete task'}
          </button>
        </div>
      </section>
    </div>
  );
}
