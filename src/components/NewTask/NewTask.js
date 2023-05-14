
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import { useHttp } from '../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useHttp();


  const enterTaskHandler = async (taskText) => {

    const createdTask = (data) => {
      const createdTask = { id: data.name, text: taskText };
      props.onAddTask(createdTask);
    }

    sendRequest({
      url: 'https://react-http-640f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: { text: taskText }
    }, createdTask)
    
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
