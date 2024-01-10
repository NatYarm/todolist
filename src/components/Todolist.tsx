import { useState, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistTitle: string;
  todolistId: string;
  tasks: Array<TaskType>;
  addTask: (todolistId: string, taskTitle: string) => void;
  removeTask: (todolistId: string, taskId: string) => void;
  changeTaskStatus: (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => void;
};

const Todolist = (props: PropsType) => {
  const {
    tasks,
    todolistTitle,
    todolistId,
    removeTask,
    changeTaskStatus,
    addTask,
  } = props;

  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(false);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    inputError && setInputError(false);
  };

  const addTaskHandler = () => {
    const trimmedTask = title.trim();
    if (trimmedTask) {
      addTask(todolistId, title);
    } else {
      setInputError(true);
    }
    setTitle('');
  };

  const addTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title) {
      addTaskHandler();
    }
  };

  const removeTaskHandler = (todolistId: string, taskId: string) => {
    removeTask(todolistId, taskId);
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
      <h3>{todolistTitle}</h3>
      <div>
        <input
          value={title}
          onChange={inputChangeHandler}
          onKeyDown={addTaskOnKeyDown}
        />
        <button onClick={addTaskHandler} disabled={!title}>
          +
        </button>
        {inputError && <p className="error-msg">Title is required</p>}
      </div>

      {tasksForTodolist.length ? (
        <ul>
          {tasksForTodolist.map(t => (
            <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={e =>
                  changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
                }
              />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  removeTaskHandler(todolistId, t.id);
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span>Tasks list is empty</span>
      )}

      <div>
        <button
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
        </button>
      </div>
    </div>
  );
};

export default Todolist;
