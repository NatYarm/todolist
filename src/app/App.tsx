import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { selectIsInitialized, selectStatus } from './appSlice';
import Login from '../features/auth/ui/Login';
import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { ButtonAppBar, ErrorSnackbar } from 'common/components';
import './App.css';
import { authThunks } from '../features/auth/model/authSlice';
import TodolistsList from '../features/todolistsList/TodolistsList';

const App = ({ demo = false }: PropsType) => {
  const status = useSelector(selectStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo) return;
    dispatch(authThunks.initializeApp());
  }, [dispatch, demo]);

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
          <Route path="/" element={<TodolistsList />} />
          <Route path="login" element={<Login />} />
          <Route path="404" element={<h1 style={{ textAlign: 'center' }}>Page Not Found</h1>} />
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
