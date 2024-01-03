import { useState, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todoListTitle: string;
  tasks: Array<TaskType>;
  filterValue: FilterValuesType;
  addTask: (taskTitle: string) => void;
  removeTask: (taskId: string) => void;
  changeFilter: (filterValue: FilterValuesType) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

const Todolist = (props: PropsType) => {
  const {
    tasks,
    todoListTitle,
    filterValue,
    removeTask,
    changeFilter,
    changeTaskStatus,
    addTask,
  } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [inputError, setInputError] = useState(false);

  const inputChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
    inputError && setInputError(false);
  };

  const addTaskHandler = () => {
    const trimmedTask = taskTitle.trim();
    if (trimmedTask) {
      addTask(taskTitle);
    } else {
      setInputError(true);
    }
    setTaskTitle('');
  };

  const addTaskOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && taskTitle) {
      addTaskHandler();
    }
  };

  return (
    <div className="todoList">
      <h3>{todoListTitle}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={inputChangeHandler}
          onKeyDown={addTaskOnKeyDown}
        />
        <button onClick={addTaskHandler} disabled={!taskTitle}>
          +
        </button>
        {inputError && <p className="error-msg">Title is required</p>}
      </div>

      {tasks.length ? (
        <ul>
          {tasks.map(t => (
            <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
              <input
                type="checkbox"
                checked={t.isDone}
                onChange={e => changeTaskStatus(t.id, e.currentTarget.checked)}
              />
              <span>{t.title}</span>
              <button
                onClick={() => {
                  removeTask(t.id);
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
            changeFilter('all');
          }}
          className={filterValue === 'all' ? 'btn-active' : ''}
        >
          All
        </button>
        <button
          onClick={() => {
            changeFilter('active');
          }}
          className={filterValue === 'active' ? 'btn-active' : ''}
        >
          Active
        </button>
        <button
          onClick={() => {
            changeFilter('completed');
          }}
          className={filterValue === 'completed' ? 'btn-active' : ''}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
