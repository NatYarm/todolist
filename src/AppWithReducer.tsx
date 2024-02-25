import { Reducer, useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';
import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import {
  addTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
  tasksReducer,
  changeTaskTitleAC,
} from './reducers/tasksReducer';
import {
  removeTodolistAC,
  addTodolistAC,
  todolistsReducer,
  changeTodolistTitleAC,
  TodolistReducerActionsType,
} from './reducers/todolistsReducer';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodolists] = useReducer<
    Reducer<Array<TodolistType>, TodolistReducerActionsType> //types description is not necessary here
  >(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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

  const removeTask = (todolistId: string, taskId: string) => {
    dispatchTasks(removeTaskAC(todolistId, taskId));
  };

  const addTask = (todolistId: string, title: string) => {
    dispatchTasks(addTaskAC(todolistId, title));
  };

  const changeTaskTitle = (
    todolistId: string,
    taskId: string,
    title: string
  ) => {
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, title));
  };

  const changeTaskStatus = (
    todolistId: string,
    taskId: string,
    isDone: boolean
  ) => {
    dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone));
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchTodolists(action);
    dispatchTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchTodolists(action);
    dispatchTasks(action);
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container sx={{ padding: '15px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3} sx={{ padding: '15px' }}>
          {todolists.map(el => (
            <Grid item key={el.id}>
              <Paper
                elevation={3}
                sx={{ padding: '20px', background: '#edebeb' }}
              >
                <Todolist
                  todolistId={el.id}
                  todolistTitle={el.title}
                  tasks={tasks[el.id]}
                  addTask={addTask}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
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

export default AppWithReducer;
