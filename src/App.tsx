import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './components/Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active';
type todolistsType = { id: string; title: string; filter: FilterValuesType };

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, setTodolists] = useState<todolistsType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'HTML&CSS2', isDone: true },
      { id: v1(), title: 'JS2', isDone: true },
      { id: v1(), title: 'ReactJS2', isDone: false },
      { id: v1(), title: 'Rest API2', isDone: false },
      { id: v1(), title: 'GraphQL2', isDone: false },
    ],
  });

  const addTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(el => el.id !== taskId),
    });
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId));
    delete tasks[todolistId];
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(el =>
        el.id === taskId ? { ...el, isDone } : el
      ),
    });
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(t =>
        t.id === taskId ? { ...t, title } : t
      ),
    });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(
      todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
    );
  };

  return (
    <div className="App">
      {todolists.map(el => (
        <Todolist
          key={el.id}
          todolistId={el.id}
          todolistTitle={el.title}
          tasks={tasks[el.id]}
          addTask={addTask}
          removeTask={removeTask}
          changeTaskStatus={changeTaskStatus}
          updateTask={updateTask}
          updateTodolist={updateTodolist}
          removeTodolist={removeTodolist}
        />
      ))}
    </div>
  );
}

export default App;
