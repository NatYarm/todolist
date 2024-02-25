import { combineReducers, legacy_createStore } from 'redux';
import { tasksReducer } from '../reducers/tasksReducer';
import { todolistsReducer } from '../reducers/todolistsReducer';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

//@ts-ignore
export const store = legacy_createStore(rootReducer);

export type AppRootState = ReturnType<typeof rootReducer>;

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
