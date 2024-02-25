import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from './components/AddItemForm';
import ButtonAppBar from './components/ButtonAppBar';
import './App.css';
import TodolistWithRedux from './components/TodolistWithRedux';
import { addTodolistAC } from './reducers/todolistsReducer';
import { todolistsSelector } from './store/selectors';
import { useCallback } from 'react';

const AppWithRedux = () => {
  const dispatch = useDispatch();
  const todolists = useSelector(todolistsSelector);

  //console.log('App called');

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

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
                <TodolistWithRedux todolist={el} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AppWithRedux;
