import './App.css';
import { TaskType } from './components/Todolist';
import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';

import { addTodolistAC } from './reducers/todolistsReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './store/store';
import TodolistWithRedux from './components/TodolistWithRedux';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodolistType[]>(
    state => state.todolists
  );

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container sx={{ padding: '15px' }}>
          <AddItemForm callback={title => dispatch(addTodolistAC(title))} />
        </Grid>
        <Grid container spacing={3} sx={{ padding: '15px' }}>
          {todolists.map(el => (
            <Grid item key={el.id}>
              <Paper
                elevation={3}
                sx={{ padding: '20px', background: '#edebeb' }}
              >
                <TodolistWithRedux
                  todolistId={el.id}
                  todolistTitle={el.title}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
