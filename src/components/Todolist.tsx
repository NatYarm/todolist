import { FilterValuesType } from '../App';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filterValue: FilterValuesType) => void;
};

const Todolist = (props: PropsType) => {
  const { tasks, title, removeTask, changeFilter } = props;
  return (
    <div className="todoList">
      <h3>{title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
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
      <div>
        <button
          onClick={() => {
            changeFilter('all');
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            changeFilter('active');
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            changeFilter('completed');
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Todolist;
