import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { AddItemForm, EditableSpan } from 'common/components';
import Task from '../../tasks/Task';
import { useTodolist } from '../model/useTodolist';
import { TodolistEntityType } from '../../todolistsSlice';

type PropsType = {
  todolist: TodolistEntityType;
  demo?: boolean;
};

const Todolist = ({ todolist, demo = false }: PropsType) => {
  const {
    tasksForTodolist,
    todolistId,
    title,
    filter,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    changeFilterValue,
  } = useTodolist(todolist, demo);

  const isDisabled = todolist.entityStatus === 'loading';

  return (
    <div className="todoList">
      <h3>
        <EditableSpan oldTitle={title} callback={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist} disabled={isDisabled}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={isDisabled} />

      {tasksForTodolist?.length ? (
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
};

export default Todolist;
