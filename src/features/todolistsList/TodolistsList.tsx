import { Grid, Paper } from '@mui/material';
import { AddItemForm } from 'common/components';
import Todolist from './todolist/ui/Todolist';
import { useTodolistsList } from './useTodolistsList';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'features/auth/model/authSlice';
import { useSelector } from 'react-redux';

const TodolistsList = ({ demo = false }: PropsType) => {
  const { todolists, addTodolist } = useTodolistsList(demo);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <>
      <Grid container sx={{ padding: '15px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3} sx={{ padding: '15px' }}>
        {todolists.map(el => (
          <Grid item key={el.id}>
            <Paper elevation={3} sx={{ padding: '20px', background: '#edebeb' }}>
              <Todolist todolist={el} demo={demo} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

type PropsType = {
  demo?: boolean;
};

export default TodolistsList;
