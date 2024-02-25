import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../store/store';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddItemForm from './AddItemForm';
import Task from './Task';
import TaskWithRedux from './TaskWithRedux';
import {
  changeTodolistTitleAC,
  removeTodolistAC,
  changeTodolistFilterAC,
} from '../reducers/todolistsReducer';
import { TaskType, addTaskAC } from '../reducers/tasksReducer';
import { FilterValuesType, TodolistType } from '../AppWithReducer';
import { memo, useCallback } from 'react';

type PropsType = {
  todolist: TodolistType;
};

const TodolistWithRedux = memo((props: PropsType) => {
  const { id: todolistId, title, filter } = props.todolist;

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    state => state.tasks[todolistId]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(todolistId, title));
    },
    [dispatch, todolistId]
  );

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolistId));
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },
    [dispatch, todolistId]
  );

  const changeFilterValue = (newFilterValue: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, newFilterValue));
  };

  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  } else if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  // const tasksForTodolist = useMemo(() => {
  //   let filteredTasks = tasks;

  //   if (filter === 'active') {
  //     filteredTasks = tasks.filter(t => !t.isDone);
  //   } else if (filter === 'completed') {
  //     filteredTasks = tasks.filter(t => t.isDone);
  //   }

  //   return filteredTasks;
  // }, [filter, tasks]);

  return (
    <div className="todoList">
      <h3>
        <EditableSpan oldTitle={title} callback={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />

      {tasksForTodolist.length ? (
        <ul>
          {tasksForTodolist.map(t => (
            <Task key={t.id} task={t} todolistId={todolistId} />
            // <TaskWithRedux key={t.id} taskId={t.id} todolistId={todolistId} />
          ))}
        </ul>
      ) : (
        <span className="emptyList">Tasks list is empty</span>
      )}

      <div className="buttonsWrapper">
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => changeFilterValue('all')}
          color="primary"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          onClick={() => changeFilterValue('active')}
          color="primary"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => changeFilterValue('completed')}
          color="primary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
});

export default TodolistWithRedux;
