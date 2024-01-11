import { useState } from 'react';
import { FilterValuesType } from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <AddItemForm callback={addTaskHandler} />

      {tasksForTodolist.length ? (
        <ul>
          {tasksForTodolist.map(t => {
            const updateTaskHandler = (title: string) => {
              updateTask(todolistId, t.id, title);
            };
            return (
              <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={e =>
                    changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
                  }
                />
                <EditableSpan oldTitle={t.title} callback={updateTaskHandler} />
                <button
                  onClick={() => {
                    removeTaskHandler(todolistId, t.id);
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
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
