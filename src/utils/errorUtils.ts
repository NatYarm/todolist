import { Dispatch } from 'redux';
import { ErrorType, ResponseType } from '../api/todolist-api';
import { setAppErrorAC, setAppStatusAC } from '../reducers/appReducer';
import { isAxiosError } from 'axios';

export const handleError = (error: unknown, dispatch: Dispatch) => {
  let errorMessage: string;
  if (isAxiosError<ErrorType>(error)) {
    errorMessage = error.response
      ? error.response.data.messages[0].message
      : error.message;
  } else {
    errorMessage = (error as Error).message;
  }
  dispatch(setAppErrorAC(errorMessage));
  dispatch(setAppStatusAC('failed'));
};

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC('Some error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
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
