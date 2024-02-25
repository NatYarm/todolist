import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditableSpan from './EditableSpan';
import Checkbox from './Checkbox';

import {
  TaskType,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../reducers/tasksReducer';
import { memo } from 'react';

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

const Task = memo((props: TaskPropsType) => {
  const { task, todolistId } = props;
  const { id: taskId, title, isDone } = task;
  const dispatch = useDispatch();
  console.log('Task');

  const removeTask = () => {
    dispatch(removeTaskAC(todolistId, taskId));
  };

  const changeTaskStatus = (checked: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, checked));
  };

  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, newTitle));
  };

  return (
    <li className={isDone ? 'task-done' : 'task'}>
      <Checkbox checked={isDone} callback={changeTaskStatus} />
      <EditableSpan oldTitle={title} callback={changeTaskTitle} />
      <IconButton aria-label="delete" size="small" onClick={removeTask}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
});

export default Task;
