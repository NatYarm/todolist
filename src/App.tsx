import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './components/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);

  const [filterValue, setFilterValue] = useState<FilterValuesType>('all');

  let tasksForTodolist = tasks;

  if (filterValue === 'active') {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  if (filterValue === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  const changeFilter = (filterValue: FilterValuesType) => {
    setFilterValue(filterValue);
  };

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
