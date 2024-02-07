import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../store/store';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Checkbox from './Checkbox';
import { FilterValuesType } from '../AppWithRedux';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../reducers/tasksReducer';
import { useState } from 'react';
import AddItemForm from './AddItemForm';

type PropsType = {
  todolistId: string;
  todolistTitle: string;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodolistWithRedux = (props: PropsType) => {
  const { todolistId, todolistTitle, changeTodolistTitle, removeTodolist } =
    props;
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    state => state.tasks[todolistId]
  );

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title);
  };

  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  return (
    <div className="todoList">
      <h3>
        <EditableSpan
          oldTitle={todolistTitle}
          callback={changeTodolistTitleHandler}
        />
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        callback={() => dispatch(addTaskAC(todolistId, todolistTitle))}
      />

      {tasksForTodolist?.length ? (
        <ul>
          {tasksForTodolist.map(t => {
            return (
              <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
                <Checkbox
                  checked={t.isDone}
                  callback={checked =>
                    dispatch(changeTaskStatusAC(todolistId, t.id, checked))
                  }
                />

                <EditableSpan
                  oldTitle={t.title}
                  callback={newTitle =>
                    dispatch(changeTaskTitleAC(todolistId, t.id, newTitle))
                  }
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    dispatch(removeTaskAC(todolistId, t.id));
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className="emptyList">Tasks list is empty</span>
      )}

      <div className="buttonsWrapper">
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => {
            setFilter('all');
          }}
          color="primary"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          onClick={() => {
            setFilter('active');
          }}
          color="primary"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
          onClick={() => {
            setFilter('completed');
          }}
          color="primary"
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodolistWithRedux;
