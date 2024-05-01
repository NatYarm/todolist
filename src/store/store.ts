import { combineReducers } from 'redux';
import { configureStore, UnknownAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { tasksReducer } from '../features/todolist/tasks/tasksSlice';
import { todolistsReducer } from '../features/todolist/todolistsSlice';
import { appReducer } from '../features/app/appSlice';
import { authReducer } from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;

export type AppDispatchType = ThunkDispatch<AppRootState, unknown, UnknownAction>;

export const useAppDispatch = useDispatch<AppDispatchType>;

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, UnknownAction>;

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
