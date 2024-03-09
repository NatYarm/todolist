import {
  combineReducers,
  legacy_createStore,
  applyMiddleware,
  Action,
} from 'redux';
import { ThunkDispatch, thunk } from 'redux-thunk';
import { tasksReducer } from '../reducers/tasksReducer';
import { todolistsReducer } from '../reducers/todolistsReducer';
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
