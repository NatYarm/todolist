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
import { useSelector } from 'react-redux';
import { AppRootState } from '../store/store';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

const TaskWithRedux = memo(({ taskId, todolistId }: TaskPropsType) => {
  // const task = useSelector<AppRootState, TaskType>(
  //   state => state.tasks[todolistId].filter(t => t.id !== taskId)[0]
  // ); // filter returns array, take first el [0]
  const task = useSelector<AppRootState, TaskType>(
    state => state.tasks[todolistId].find(t => t.id === taskId) as TaskType
  );

  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC(todolistId, task.id));
  };

  const changeTaskStatus = (checked: boolean) => {
    dispatch(changeTaskStatusAC(todolistId, task.id, checked));
  };

  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistId, task.id, newTitle));
  };

  return (
    <li className={task?.isDone ? 'task-done' : 'task'}>
      <Checkbox checked={task.isDone} callback={changeTaskStatus} />
      <EditableSpan oldTitle={task.title} callback={changeTaskTitle} />
      <IconButton aria-label="delete" size="small" onClick={removeTask}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
});

export default TaskWithRedux;
