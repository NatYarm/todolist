import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SyntheticEvent } from 'react';
import { appActions, selectError } from '../../app/appSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

export const ErrorSnackbar = () => {
  const error = useSelector(selectError);
  const dispatch = useAppDispatch();

  const isOpen = error !== null;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
