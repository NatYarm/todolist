import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonAppBar from '../../components/ButtonAppBar';
import './App.css';
import Todolists from '../todolist/Todolists';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ErrorSnackbar } from '../../components/ErrorSnackbar';
import { Login } from '../login/Login';
import { meTC } from '../../reducers/appReducer';

const App = ({ demo = false }: PropsType) => {
  const status = useAppSelector(state => state.app.status);
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(meTC());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

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
        <Routes>
          <Route path="/" element={<Todolists />} />
          <Route path="login" element={<Login />} />
          <Route
            path="404"
            element={<h1 style={{ textAlign: 'center' }}>Page Not Found</h1>}
          />
          <Route path="*" element={<Navigate to={'404'} />} />
        </Routes>
      </Container>
    </div>
  );
};

type PropsType = {
  demo?: boolean;
};

export default App;
