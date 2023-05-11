import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import { useHttp } from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTask = (data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    loadedTasks.reverse();
    setTasks(loadedTasks);
  }

  const { isLoading, error, sendRequest } = useHttp(
    {
      url: 'https://react-http-640f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
    }, transformTask
  )



  useEffect(() => {
    sendRequest();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
  };

  function del(id) {
    fetch(
      `https://react-http-640f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
      {
        method: 'DELETE',
      }
    );
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        del={del}
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
