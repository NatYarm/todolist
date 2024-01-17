import { useState } from 'react';
import { FilterValuesType } from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistTitle: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
  removeTodolist: (todolistId: string) => void;
};

const Todolist = (props: PropsType) => {
  const {
    tasks,
    todolistTitle,
    todolistId,
    removeTask,
    changeTaskStatus,
    addTask,
    updateTask,
    updateTodolist,
    removeTodolist,
  } = props;

  const [filter, setFilter] = useState<FilterValuesType>('all');

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title);
  };

  const removeTaskHandler = (todolistId: string, taskId: string) => {
    removeTask(todolistId, taskId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(todolistId, title);
  };

  const updateTaskHandler = (id: string, title: string) => {
    updateTask(todolistId, id, title);
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
          callback={updateTodolistHandler}
        />
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <Delete />
        </IconButton>
        {/* <button onClick={removeTodolistHandler}>x</button> */}
      </h3>
      <AddItemForm callback={addTaskHandler} />

      {tasksForTodolist.length ? (
        <ul>
          {tasksForTodolist.map(t => {
            return (
              <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={e =>
                    changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
                  }
                />
                <EditableSpan
                  oldTitle={t.title}
                  callback={title => updateTaskHandler(t.id, title)}
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => {
                    removeTaskHandler(todolistId, t.id);
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
        {/* <button
          onClick={() => {
            setFilter('all');
          }}
          className={filter === 'all' ? 'btn-active' : ''}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilter('active');
          }}
          className={filter === 'active' ? 'btn-active' : ''}
        >
          Active
        </button>
        <button
          onClick={() => {
            setFilter('completed');
          }}
          className={filter === 'completed' ? 'btn-active' : ''}
        >
          Completed
        </button> */}
      </div>
    </div>
  );
};

export default Todolist;
