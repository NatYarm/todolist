import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TaskStatuses } from 'common/enums';
import { TaskType } from 'features/todolistsList/todolistApi';
import { useTask } from './useTask';
import { Checkbox, EditableSpan } from 'common/components';

type Props = {
  todolistId: string;
  task: TaskType;
};

const Task = ({ todolistId, task }: Props) => {
  const { removeTask, changeTaskStatus, changeTaskTitle } = useTask(todolistId, task);

  return (
    <li className={task.status === TaskStatuses.Completed ? 'task-done' : 'task'}>
      <Checkbox checked={task.status === TaskStatuses.Completed} callback={changeTaskStatus} />
      <EditableSpan oldTitle={task.title} callback={changeTaskTitle} />
      <IconButton aria-label="delete" size="small" onClick={removeTask}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
};

export default Task;
