import EditableSpan from '../../components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import AddItemForm from '../../components/addItemForm/AddItemForm';
import Task from '../task/Task';
import { memo } from 'react';
import { useTodolist } from './useTodolist';
import { TodolistEntityType } from '../../reducers/todolistsReducer';

type PropsType = {
  todolist: TodolistEntityType;
};

const Todolist = memo(({ todolist }: PropsType) => {
  const {
    tasksForTodolist,
    todolistId,
    title,
    filter,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    changeFilterValue,
  } = useTodolist(todolist);

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
            <Task key={t.id} taskId={t.id} todolistId={todolistId} />
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

export default Todolist;
