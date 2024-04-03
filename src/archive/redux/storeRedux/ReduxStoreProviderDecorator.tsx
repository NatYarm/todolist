// import { Provider } from 'react-redux';
// import { AppRootStateType } from './store';
// import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
// import { tasksReducer } from '../reducers/tasksReducer';
// import { todolistsReducer } from '../reducers/todolistsReducer';
// import { v1 } from 'uuid';
// import { TaskPriorities, TaskStatuses } from '../api/todolist-api';
// import { appReducer } from '../reducers/appReducer';
// import { thunk } from 'redux-thunk';

// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   app: appReducer,
// });

// const initialGlobalState = {
//   todolists: [
//     {
//       id: 'todolistId1',
//       title: 'What to learn',
//       filter: 'all',
//       entityStatus: 'idle',
//     },
//     {
//       id: 'todolistId2',
//       title: 'What to buy',
//       filter: 'all',
//       entityStatus: 'loading',
//     },
//   ],
//   tasks: {
//     /* eslint-disable */
//     ['todolistId1']: [
//       {
//         id: v1(),
//         title: 'HTML&CSS',
//         status: TaskStatuses.New,
//         todoListId: 'todolistId1',
//         description: '',
//         priority: TaskPriorities.Low,
//         addedDate: new Date(),
//         startDate: new Date(),
//         deadline: new Date(),
//         order: 0,
//       },
//       {
//         id: v1(),
//         title: 'JS',
//         status: TaskStatuses.Completed,
//         todoListId: 'todolistId1',
//         description: '',
//         priority: TaskPriorities.Low,
//         addedDate: new Date(),
//         startDate: new Date(),
//         deadline: new Date(),
//         order: 0,
//       },
//     ],
//     ['todolistId2']: [
//       {
//         id: v1(),
//         title: 'Milk',
//         status: TaskStatuses.New,
//         todoListId: 'todolistId2',
//         description: '',
//         priority: TaskPriorities.Low,
//         addedDate: new Date(),
//         startDate: new Date(),
//         deadline: new Date(),
//         order: 0,
//       },
//       {
//         id: v1(),
//         title: 'React Book',
//         status: TaskStatuses.Completed,
//         todoListId: 'todolistId2',
//         description: '',
//         priority: TaskPriorities.Low,
//         addedDate: new Date(),
//         startDate: new Date(),
//         deadline: new Date(),
//         order: 0,
//       },
//     ],
//   },
// };

// export const storyBookStore = legacy_createStore(
//   //@ts-ignore
//   rootReducer,
//   initialGlobalState as AppRootStateType & undefined,
//   applyMiddleware(thunk)
// );

// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//   return <Provider store={storyBookStore}>{storyFn()}</Provider>;
// };

export {};
