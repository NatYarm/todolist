import { Dispatch } from 'redux';
import { ErrorType, ResponseType } from '../api/todolist-api';
import { appActions } from '../features/app/appSlice';
import { isAxiosError } from 'axios';

export const handleError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage: string;
  if (isAxiosError<ErrorType>(error) && error.response) {
    errorMessage = error.response.data.messages[0].message;
  } else {
    errorMessage = (error as Error).message;
  }
  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: 'Some error occurred' }));
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }));
};

// export const handleServerNetworkError = (
//   error: ErrorType,
//   dispatch: Dispatch<ErrorUtilsDispatchType>
// ) => {
//   dispatch(
//     setAppErrorAC(error.message ? error.message : 'Some error occurred')
//   );
//   dispatch(setAppStatusAC('failed'));
// };

// type ErrorUtilsDispatchType = SetRequestStatusType | SetErrorType;

// type ErrorType = {
//   message: string;
// };

// type ErrorType = {
//   statusCode: number;
//   messages: [
//     {
//       message: string;
//       field: string;
//     }
//   ];
//   error: string;
// };
