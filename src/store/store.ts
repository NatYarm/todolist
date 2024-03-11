import {
  combineReducers,
  legacy_createStore,
  applyMiddleware,
  Action,
} from 'redux';
import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';
import { TasksActionsType, tasksReducer } from '../reducers/tasksReducer';
import {
  TodolistsActionsType,
  todolistsReducer,
} from '../reducers/todolistsReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

//@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>;

export const useAppDispatch = useDispatch<AppDispatchType>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppActionsType = TodolistsActionsType | TasksActionsType;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
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
