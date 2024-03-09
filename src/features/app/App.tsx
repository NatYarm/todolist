import { useEffect } from 'react';
import ButtonAppBar from '../../components/ButtonAppBar';
import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from '../../components/addItemForm/AddItemForm';
import './App.css';
import Todolist from '../todolist/Todolist';
import { useApp } from './useApp';
import { fetchTodolistsTC } from '../../reducers/todolistsReducer';

import { useAppDispatch } from '../../store/store';

const App = () => {
  const { todolists, addTodolist } = useApp();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC);
  }, []);

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
                <Todolist todolist={el} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default App;
