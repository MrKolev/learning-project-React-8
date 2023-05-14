import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import { useHttp } from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const transformTask = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      loadedTasks.reverse();
      setTasks(loadedTasks);
    }

    sendRequest(
      { url: 'https://react-http-640f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json' },
      transformTask
    );
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        del={(id) => {
          fetch(
            `https://react-http-640f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
            {
              method: 'DELETE',
            }
          );
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
        }}

        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
