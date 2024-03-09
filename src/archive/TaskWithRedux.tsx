import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditableSpan from '../components/EditableSpan';
import Checkbox from '../components/Checkbox';

import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../reducers/tasksReducer';
import { memo } from 'react';

import { useAppSelector } from '../store/store';
import { TaskStatuses, TaskType } from '../api/todolist-api';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

const TaskWithRedux = memo(({ taskId, todolistId }: TaskPropsType) => {
  // const task = useSelector<AppRootState, TaskType>(
  //   state => state.tasks[todolistId].filter(t => t.id !== taskId)[0]
  // ); // filter returns array, take first el [0]
  const task = useAppSelector<TaskType>(
    state => state.tasks[todolistId].find(t => t.id === taskId) as TaskType
  );

  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC(todolistId, task.id));
  };

  const changeTaskStatus = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(changeTaskStatusAC(todolistId, task.id, newStatus));
  };

  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistId, task.id, newTitle));
  };

  return (
    <li
      className={task.status === TaskStatuses.Completed ? 'task-done' : 'task'}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        callback={changeTaskStatus}
      />
      <EditableSpan oldTitle={task.title} callback={changeTaskTitle} />
      <IconButton aria-label="delete" size="small" onClick={removeTask}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
});

export default TaskWithRedux;
