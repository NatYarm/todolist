import { memo } from 'react';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '../../components/Checkbox';
import EditableSpan from '../../components/EditableSpan';
import { TaskStatuses } from '../../api/todolist-api';
import { useTask } from './useTask';

type TaskPropsType = {
  todolistId: string;
  taskId: string;
};

const Task = memo(({ todolistId, taskId }: TaskPropsType) => {
  const { task, removeTask, changeTaskStatus, changeTaskTitle } = useTask(
    todolistId,
    taskId
  );

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

export default Task;
