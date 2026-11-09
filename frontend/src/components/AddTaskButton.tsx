export default function AddTaskButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="add-task-fab-wrap">
      <button
        type="button"
        onClick={onClick}
        aria-label="Add a task"
        className="add-task-fab"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}