import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../store/store';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FilterValuesType } from '../AppWithRedux';

import AddItemForm from './AddItemForm';
import Task from './Task';
import {
  changeTodolistTitleAC,
  removeTodolistAC,
} from '../reducers/todolistsReducer';
import { addTaskAC } from '../reducers/tasksReducer';

type PropsType = {
  todolistId: string;
  todolistTitle: string;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const TodolistWithRedux = (props: PropsType) => {
  const { todolistId, todolistTitle } = props;

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    state => state.tasks[todolistId]
  );

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
          callback={title => dispatch(changeTodolistTitleAC(todolistId, title))}
        />
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(removeTodolistAC(todolistId))}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm callback={title => dispatch(addTaskAC(todolistId, title))} />

      {tasksForTodolist?.length ? (
        <ul>
          {tasksForTodolist.map(t => (
            <Task key={t.id} taskId={t.id} todolistId={todolistId} />
          ))}
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
