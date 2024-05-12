import { Dispatch } from 'redux';
import { appActions } from 'app/appSlice';
import { BaseResponseType } from 'common/types';

export const handleServerAppError = <T>(
  data: BaseResponseType<T>,
  dispatch: Dispatch,
  showGlobalError: boolean = true
) => {
  if (showGlobalError) {
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }));
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};
