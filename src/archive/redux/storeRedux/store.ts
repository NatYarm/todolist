// import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
// import { ThunkAction, ThunkDispatch, thunk } from 'redux-thunk';
// import { TasksActionsType, tasksReducer } from '../reducers/tasksReducer';
// import {
//   TodolistsActionsType,
//   todolistsReducer,
// } from '../reducers/todolistsReducer';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { AppActionsType, appReducer } from '../reducers/appReducer';
// import { LoginActionsType, authReducer } from '../reducers/authReducer';

// const rootReducer = combineReducers({
//   todolists: todolistsReducer,
//   tasks: tasksReducer,
//   app: appReducer,
//   auth: authReducer,
// });

// //@ts-ignore
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export type AppRootStateType = ReturnType<typeof rootReducer>;

// export type AppDispatchType = ThunkDispatch<
//   AppRootStateType,
//   unknown,
//   AllActionsType
// >;

// export const useAppDispatch = useDispatch<AppDispatchType>;

// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
//   useSelector;

// export type AllActionsType =
//   | TodolistsActionsType
//   | TasksActionsType
//   | AppActionsType
//   | LoginActionsType;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppRootStateType,
//   unknown,
//   AllActionsType
// >;

// //@ts-ignore
// window.store = store;

// //this is store object:
// // {
// //   state: {
// //     tasks: {},
// //     todolists: []
// //   }
// //   getState()
// //   dispatch()
// //   subscribe()
// // }

export {};
