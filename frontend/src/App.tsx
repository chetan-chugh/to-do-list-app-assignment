import { useState } from 'react';
import { useTodoApp } from './hooks/useTodoApp';
import Layout from './components/Layout';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import TaskContent from './components/TaskContent';
import AddTaskButton from './components/AddTaskButton';
import TaskForm from './components/TaskForm';
import Onboarding from './components/Onboarding';
import DeleteTaskDialog from './components/DeleteTaskDialog';
import LoadingSkeleton from './components/LoadingSkeleton';
import { Task } from './types/task';

export default function App() {
  const [started, setStarted] = useState(false);

  const handleGetStarted = () => {
    setStarted(true);
  };

  if (!started) {
    return <Onboarding onGetStarted={handleGetStarted} />;
  }

  return <TodoApp />;
}

function TodoApp() {
  const app = useTodoApp();
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const taskActions = {
    ...app.taskActions,
    onDelete: setTaskToDelete,
  };

  if (app.loading) {
    return <LoadingSkeleton />;
  }

  return (
    <Layout>
      <Header
        view={app.view}
        onOpenSearch={() => app.setView('search')}
        onBack={() => app.setView('home')}
      />

      <ErrorMessage message={app.error} />

      <TaskContent
        view={app.view}
        tasks={app.tasks}
        taskActions={taskActions}
        onViewAll={() => app.setView('weeks')}
      />

      <AddTaskButton onClick={() => app.openForm()} />

      {app.formOpen && (
        <TaskForm
          task={app.editingTask}
          onSave={app.handleSave}
          onDelete={setTaskToDelete}
          onClose={app.closeForm}
        />
      )}

      {taskToDelete && (
        <DeleteTaskDialog
          task={taskToDelete}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={async () => {
            await app.handleDelete(taskToDelete);
            setTaskToDelete(null);
          }}
        />
      )}
    </Layout>
  );
}
