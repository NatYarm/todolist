// import { RESULT_CODE, authAPI } from '../api/todolist-api';
// import { AppThunk } from '../store/store';
// import { setIsLoggedInAC } from '../reducers/authReducer';
// import { handleError } from '../utils/errorUtils';

// const initialState: InitialStateType = {
//   status: 'idle',
//   error: null,
//   isInitialized: false,
// };

// export const appReducer = (
//   state: InitialStateType = initialState,
//   action: AppActionsType
// ): InitialStateType => {
//   switch (action.type) {
//     case 'APP/SET_STATUS':
//       return { ...state, status: action.status };
//     case 'APP/SET_ERROR':
//       return { ...state, error: action.error };
//     case 'APP/SET_IS_INITIALIZED':
//       return { ...state, isInitialized: action.value };
//     default:
//       return state;
//   }
// };

// export const setAppStatusAC = (status: RequestStatusType) =>
//   ({ type: 'APP/SET_STATUS', status } as const);

// export const setAppErrorAC = (error: AppErrorType) =>
//   ({ type: 'APP/SET_ERROR', error } as const);

// export const setAppIsInitializedAC = (value: boolean) =>
//   ({ type: 'APP/SET_IS_INITIALIZED', value } as const);

// //thunks

// export const meTC = (): AppThunk => async dispatch => {
//   try {
//     const res = await authAPI.me();
//     if (res.data.resultCode === RESULT_CODE.SUCCESS) {
//       dispatch(setIsLoggedInAC(true));
//     }
//   } catch (error) {
//     handleError(error, dispatch);
//   }
//   dispatch(setAppIsInitializedAC(true));
// };

// type InitialStateType = {
//   isInitialized: boolean;
//   status: RequestStatusType;
//   error: AppErrorType;
// };

// export type AppActionsType =
//   | SetRequestStatusType
//   | SetErrorType
//   | SetAppIsInitializedType;

// export type SetRequestStatusType = ReturnType<typeof setAppStatusAC>;
// export type SetErrorType = ReturnType<typeof setAppErrorAC>;
// export type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>;

// export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed';
// type AppErrorType = string | null;

export {};
