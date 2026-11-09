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
import { Task } from './types/task';

export default function App() {
  const [started, setStarted] = useState(
    () => window.localStorage.getItem('todo-app-started') === 'true'
  );

  const handleGetStarted = () => {
    window.localStorage.setItem('todo-app-started', 'true');
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
        loading={app.loading}
        tasks={app.tasks}
        taskActions={taskActions}
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