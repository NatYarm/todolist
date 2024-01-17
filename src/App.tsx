import { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';
import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import {
  addTaskAC,
  addNewTasksAC,
  removeTaskAC,
  changeTaskStatusAC,
  taskReducer,
  updateTaskAC,
} from './reducers/taskReducer';
import {
  removeTodolistAC,
  addTodolistAC,
  updateTodolistAC,
  todolistReducer,
} from './reducers/todolistReducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, dispatchTasks] = useReducer(taskReducer, {
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
    // const newTask = { id: v1(), title, isDone: false };
    // setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    dispatchTasks(addTaskAC(todolistId, title));
  };

  const removeTask = (todolistId: string, taskId: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].filter(el => el.id !== taskId),
    //});
    dispatchTasks(removeTaskAC(todolistId, taskId));
  };

  const removeTodolist = (todolistId: string) => {
    //setTodolists(todolists.filter(el => el.id !== todolistId));
    dispatchTodolists(removeTodolistAC(todolistId));
    delete tasks[todolistId];
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map(el =>
    //     el.id === taskId ? { ...el, isDone } : el
    //   ),
    // });
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistId]: tasks[todolistId].map(t =>
    //     t.id === taskId ? { ...t, title } : t
    //   ),
    //});
    dispatchTasks(updateTaskAC(todolistId, taskId, title));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    // setTodolists(
    //   todolists.map(tl => (tl.id === todolistId ? { ...tl, title } : tl))
    // );
    dispatchTodolists(updateTodolistAC(todolistId, title));
  };

  const addTodolist = (title: string) => {
    // const newTodolistId = v1();
    // const newTodolist: TodolistsType = {
    //   id: newTodolistId,
    //   title,
    //   filter: 'all',
    // };
    // setTodolists([...todolists, newTodolist]);
    // setTasks({ ...tasks, [newTodolistId]: [] });
    const todolistId = v1();
    dispatchTodolists(addTodolistAC(todolistId, title));
    dispatchTasks(addNewTasksAC(todolistId));
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container sx={{ padding: '15px' }}>
          <AddItemForm callback={addTodolist} />
        </Grid>
        <Grid container spacing={3} sx={{ padding: '15px' }}>
          {todolists.map(el => (
            <Grid item>
              <Paper
                elevation={3}
                sx={{ padding: '20px', background: '#edebeb' }}
              >
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
