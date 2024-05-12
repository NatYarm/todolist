import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/auth/model/authSlice';
import { tasksReducer } from '../../features/todolistsList/tasks/tasksSlice';
import { todolistsReducer } from '../../features/todolistsList/todolistsSlice';
import { appReducer } from '../appSlice';

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
