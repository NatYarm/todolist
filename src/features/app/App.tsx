import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';
import ButtonAppBar from '../../components/ButtonAppBar';
import Todolists from '../todolist/Todolists';
import { useAppSelector } from '../../store/store';
import { ErrorSnackbar } from '../../components/ErrorSnackbar';

const App = ({ demo = false }: PropsType) => {
  const status = useAppSelector(state => state.app.status);
  return (
    <div className="App">
      <ButtonAppBar />
      {status === 'loading' && (
        <div className="progress-bar">
          <LinearProgress />
        </div>
      )}
      <Container fixed>
        <ErrorSnackbar />
        <Todolists demo={demo} />
      </Container>
    </div>
  );
};

type PropsType = {
  demo?: boolean;
};

export default App;
