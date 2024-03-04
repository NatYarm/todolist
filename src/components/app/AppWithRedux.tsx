import { Container, Grid, Paper } from '@mui/material';
import AddItemForm from '../addItemForm/AddItemForm';
import ButtonAppBar from '../ButtonAppBar';
import './App.css';
import TodolistWithRedux from '../todolist/TodolistWithRedux';
import { useAppWithRedux } from './useAppWithRedux';

const AppWithRedux = () => {
  const { todolists, addTodolist } = useAppWithRedux();

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
