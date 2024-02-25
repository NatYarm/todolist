import { useState } from 'react';
import { FilterValuesType } from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Checkbox from './Checkbox';

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
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
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
    changeTaskTitle,
    changeTodolistTitle,
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

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title);
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    changeTaskTitle(todolistId, taskId, newTitle);
  };

  const changeTaskStatusHandler = (taskId: string, checked: boolean) => {
    changeTaskStatus(todolistId, taskId, checked);
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
      <AddItemForm addItem={addTaskHandler} />

      {tasksForTodolist?.length ? (
        <ul>
          {tasksForTodolist.map(t => {
            return (
              <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
                <Checkbox
                  checked={t.isDone}
                  callback={checked => changeTaskStatusHandler(t.id, checked)}
                />

                <EditableSpan
                  oldTitle={t.title}
                  callback={newTitle => changeTaskTitleHandler(t.id, newTitle)}
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
      </div>
    </div>
  );
};

export default Todolist;
