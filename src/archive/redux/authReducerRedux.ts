// import { handleError } from './../utils/errorUtils';
// import { Dispatch } from 'redux';
// import { LoginParamsType, RESULT_CODE, authAPI } from '../api/todolist-api';
// import { AppThunk } from '../store/store';
// import { handleServerAppError } from '../utils/errorUtils';
// import { setAppStatusAC } from './appReducer';
// import { clearTodosDataAC } from './todolistsReducerRedux';

// const initialState: InitialStateType = { isLoggedIn: false };

// export const authReducer = (
//   state: InitialStateType = initialState,
//   action: LoginActionsType
// ): InitialStateType => {
//   switch (action.type) {
//     case 'login/SET_IS_LOGGED_IN':
//       return { ...state, isLoggedIn: action.value };

//     default:
//       return state;
//   }
// };

// export const setAppIsInitializedAC = (value: boolean) =>
//   ({ type: 'APP/SET-IS-INITIALIZED', value } as const);

// export const setIsLoggedInAC = (value: boolean) =>
//   ({
//     type: 'login/SET_IS_LOGGED_IN',
//     value,
//   } as const);

// export const loginTC =
//   (data: LoginParamsType): AppThunk =>
//   async (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading'));

//     try {
//       const res = await authAPI.login(data);
//       if (res.data.resultCode === RESULT_CODE.SUCCESS) {
//         dispatch(setIsLoggedInAC(true));
//         dispatch(setAppStatusAC('success'));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };

// export const logoutTC = () => async (dispatch: Dispatch) => {
//   dispatch(setAppStatusAC('loading'));
//   try {
//     const res = await authAPI.logout();
//     if (res.data.resultCode === RESULT_CODE.SUCCESS) {
//       dispatch(setIsLoggedInAC(false));
//       dispatch(setAppStatusAC('success'));
//       dispatch(clearTodosDataAC());
//     } else {
//       handleServerAppError(res.data, dispatch);
//     }
//   } catch (error) {
//     handleError(error, dispatch);
//   }
// };

// export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>;
// type InitialStateType = { isLoggedIn: boolean };
export {};
