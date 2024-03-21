import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SyntheticEvent } from 'react';

import { setAppErrorAC } from '../reducers/appReducer';
import { useAppDispatch, useAppSelector } from '../store/store';

export const ErrorSnackbar = () => {
  const error = useAppSelector(state => state.app.error);
  const dispatch = useAppDispatch();

  const isOpen = error !== null;

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAppErrorAC(null));
  };

  return (
    <div>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
