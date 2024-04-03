import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { tasksReducer } from '../reducers/tasksReducer';
import { todolistsReducer } from '../reducers/todolistsReducer';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';
import { appReducer } from '../reducers/appReducer';
import { authReducer } from 'reducers/authReducer';
import { configureStore } from '@reduxjs/toolkit';
import { AppRootState } from './store';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

const initialGlobalState: AppRootState = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      order: 1,
      addedDate: new Date(),
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'loading',
      order: 0,
      addedDate: new Date(),
    },
  ],
  tasks: {
    /* eslint-disable */
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 1,
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 1,
      },
    ],
  },
  app: {
    error: null,
    status: 'success',
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
};

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
