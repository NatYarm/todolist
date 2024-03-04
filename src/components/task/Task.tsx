import { useDispatch } from 'react-redux';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditableSpan from '../EditableSpan';
import Checkbox from '../Checkbox';

import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../../reducers/tasksReducer';
import { memo } from 'react';
import { TaskStatuses, TaskType } from '../../api/todolist-api';

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

const Task = memo((props: TaskPropsType) => {
  const { task, todolistId } = props;
  const { id: taskId, title, status } = task;
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC(todolistId, taskId));
  };

  const changeTaskStatus = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(changeTaskStatusAC(todolistId, taskId, newStatus));
  };

  const changeTaskTitle = (newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistId, taskId, newTitle));
  };

  return (
    <li className={status === TaskStatuses.Completed ? 'task-done' : 'task'}>
      <Checkbox
        checked={status === TaskStatuses.Completed}
        callback={changeTaskStatus}
      />
      <EditableSpan oldTitle={title} callback={changeTaskTitle} />
      <IconButton aria-label="delete" size="small" onClick={removeTask}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
});

export default Task;
