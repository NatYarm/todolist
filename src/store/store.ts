import { combineReducers } from 'redux';
import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { tasksReducer } from '../reducers/tasksReducer';
import { todolistsReducer } from '../reducers/todolistsReducer';
import { appReducer } from '../reducers/appReducer';
import { authReducer } from '../reducers/authReducer';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export type AppDispatchType = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;

export const useAppDispatch = useDispatch<AppDispatchType>;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootState,
  unknown,
  UnknownAction
>;

//@ts-ignore
window.store = store;

//this is store object:
// {
//   state: {
//     tasks: {},
//     todolists: []
//   }
//   getState()
//   dispatch()
//   subscribe()
// }
