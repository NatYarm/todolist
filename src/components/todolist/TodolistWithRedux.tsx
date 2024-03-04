import EditableSpan from '../EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddItemForm from '../addItemForm/AddItemForm';
import Task from '../task/Task';
import { memo } from 'react';
import { useTodolistWithRedux } from './hooks/useTodolistWithRedux';
import { TodolistEntityType } from '../../reducers/todolistsReducer';

type PropsType = {
  todolist: TodolistEntityType;
};

const TodolistWithRedux = memo(({ todolist }: PropsType) => {
  const {
    tasksForTodolist,
    todolistId,
    title,
    filter,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    changeFilterValue,
  } = useTodolistWithRedux(todolist);

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
