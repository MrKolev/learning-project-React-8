import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  return (
  <li className={classes.task}>{props.children}-----
  <button onClick={() => props.del(props.id)} >delete</button>
  </li>)
};

export default TaskItem;