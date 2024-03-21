import { Grid, Paper } from '@mui/material';
import AddItemForm from '../../components/addItemForm/AddItemForm';
import Todolist from './Todolist';
import { useTodolists } from './useTodolists';

const Todolists = ({ demo = false }: PropsType) => {
  const { todolists, addTodolist } = useTodolists(demo);

  return (
    <>
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

export default Todolists;
