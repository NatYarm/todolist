import { useDispatch, useSelector } from 'react-redux';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import EditableSpan from './EditableSpan';
import Checkbox from './Checkbox';
import { AppRootState } from '../store/store';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../reducers/tasksReducer';
import { TaskType } from './TodolistWithRedux';

type TaskPropsType = {
  taskId: string;
  todolistId: string;
};

const Task = (props: TaskPropsType) => {
  const { taskId, todolistId } = props;
  const dispatch = useDispatch();
  const task = useSelector<AppRootState, TaskType | undefined>(state =>
    state.tasks[todolistId].find(t => t.id === taskId)
  );

  if (!task) {
    return <p>No task is found</p>;
  }

  const { title, isDone } = task;

  return (
    <li className={isDone ? 'task-done' : 'task'}>
      <Checkbox
        checked={isDone}
        callback={checked =>
          dispatch(changeTaskStatusAC(todolistId, taskId, checked))
        }
      />

      <EditableSpan
        oldTitle={title}
        callback={newTitle =>
          dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
        }
      />
      <IconButton
        aria-label="delete"
        size="small"
        onClick={() => {
          dispatch(removeTaskAC(todolistId, taskId));
        }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
};

export default Task;
