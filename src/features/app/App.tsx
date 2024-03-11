import { Container } from '@mui/material';
import './App.css';
import ButtonAppBar from '../../components/ButtonAppBar';
import Todolists from '../todolist/Todolists';

const App = () => {
  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Todolists />
      </Container>
    </div>
  );
};

export default App;
