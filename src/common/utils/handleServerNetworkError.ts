import { Dispatch } from 'redux';
import { isAxiosError } from 'axios';
import { appActions } from 'app/appSlice';

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = 'Some error occurred';

  if (isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};
