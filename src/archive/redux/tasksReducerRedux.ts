// import {
//   RESULT_CODE,
//   TaskPriorities,
//   TaskStatuses,
//   TaskType,
//   UpdateTaskModelType,
//   todolistsAPI,
// } from '../../api/todolist-api';
// import { AppRootStateType, AppThunk } from '../redux/storeRedux/store';
// import { handleError, handleServerAppError } from '../../utils/errorUtils';
// import { setAppStatusAC } from '../redux/appReducerRedux';
// import {
//   AddTodolistActionType,
//   RemoveTodolistActionType,
//   SetTodolistsActionType,
// } from './todolistsReducerRedux';

// const initialState: TasksStateType = {};

// export const tasksReducer = (
//   state: TasksStateType = initialState,
//   action: TasksActionsType
// ): TasksStateType => {
//   switch (action.type) {
//     case 'SET_TASKS':
//       return { ...state, [action.todolistId]: action.tasks };
//     case 'REMOVE_TASK':
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].filter(
//           t => t.id !== action.taskId
//         ),
//       };
//     case 'ADD_TASK':
//       return {
//         ...state,
//         [action.task.todoListId]: [
//           action.task,
//           ...state[action.task.todoListId],
//         ],
//       };
//     case 'UPDATE_TASK':
//       return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map(t =>
//           t.id === action.taskId ? { ...t, ...action.model } : t
//         ),
//       };
//     case 'ADD_TODOLIST':
//       return { ...state, [action.todolist.id]: [] };
//     case 'REMOVE_TODOLIST':
//       const stateCopy = { ...state };
//       delete stateCopy[action.todolistId];
//       return stateCopy;
//     case 'SET_TODOLISTS': {
//       const copyState = { ...state };
//       action.todolists.forEach(tl => {
//         copyState[tl.id] = [];
//       });
//       return copyState;
//     }

//     default:
//       return state;
//   }
// };

// const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
//   ({ type: 'SET_TASKS', todolistId, tasks } as const);

// export const removeTaskAC = (todolistId: string, taskId: string) =>
//   ({ type: 'REMOVE_TASK', todolistId, taskId } as const);

// export const addTaskAC = (task: TaskType) =>
//   ({ type: 'ADD_TASK', task } as const);

// export const changeTaskStatusAC = (
//   todolistId: string,
//   taskId: string,
//   status: TaskStatuses
// ) => ({ type: 'CHANGE_TASK_STATUS', todolistId, taskId, status } as const);

// export const updateTaskAC = (
//   todolistId: string,
//   taskId: string,
//   model: UpdateDomainTaskModelType
// ) => ({ type: 'UPDATE_TASK', todolistId, taskId, model } as const);

// //thunks
// export const fetchTasksTC =
//   (todolistId: string): AppThunk =>
//   async dispatch => {
//     dispatch(setAppStatusAC('loading'));
//     try {
//       const res = await todolistsAPI.getTasks(todolistId);
//       dispatch(setTasksAC(todolistId, res.data.items));
//       dispatch(setAppStatusAC('success'));
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };

// export const removeTaskTC =
//   (todolistId: string, taskId: string): AppThunk =>
//   async dispatch => {
//     try {
//       await todolistsAPI.deleteTask(todolistId, taskId);
//       dispatch(removeTaskAC(todolistId, taskId));
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };

// export const addTaskTC =
//   (todolistId: string, title: string): AppThunk =>
//   async dispatch => {
//     dispatch(setAppStatusAC('loading'));
//     try {
//       const res = await todolistsAPI.createTask(todolistId, title);
//       if (res.data.resultCode === RESULT_CODE.SUCCESS) {
//         dispatch(addTaskAC(res.data.data.item));
//         dispatch(setAppStatusAC('success'));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };
// export const updateTaskTC =
//   (
//     todolistId: string,
//     taskId: string,
//     domainModel: UpdateDomainTaskModelType
//   ): AppThunk =>
//   async (dispatch, getState: () => AppRootStateType) => {
//     const tasks = getState().tasks;
//     const task = tasks[todolistId].find(t => t.id === taskId);

//     if (!task) {
//       console.warn('task not found');
//       return;
//     }

//     const apiModel: UpdateTaskModelType = {
//       title: task.title,
//       deadline: task.deadline,
//       description: task.description,
//       priority: task.priority,
//       startDate: task.startDate,
//       status: task.status,
//       ...domainModel,
//     };
//     dispatch(setAppStatusAC('loading'));
//     try {
//       const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
//       if (res.data.resultCode === RESULT_CODE.SUCCESS) {
//         dispatch(updateTaskAC(todolistId, taskId, domainModel));
//         dispatch(setAppStatusAC('success'));
//       } else {
//         handleServerAppError(res.data, dispatch);
//       }
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };

// // types
// export type TasksStateType = {
//   [key: string]: TaskType[];
// };

// export type UpdateDomainTaskModelType = {
//   title?: string;
//   description?: string;
//   status?: TaskStatuses;
//   priority?: TaskPriorities;
//   startDate?: Date;
//   deadline?: Date;
// };

// export type TasksActionsType =
//   | ReturnType<typeof removeTaskAC>
//   | ReturnType<typeof addTaskAC>
//   | ReturnType<typeof updateTaskAC>
//   | ReturnType<typeof setTasksAC>
//   | AddTodolistActionType
//   | RemoveTodolistActionType
//   | SetTodolistsActionType;

// // const initialState = {
// //[todolistId1]: [
// //   { id: v1(), title: 'HTML&CSS', isDone: true },
// //   { id: v1(), title: 'JS', isDone: true },
// //   { id: v1(), title: 'ReactJS', isDone: false },
// //   { id: v1(), title: 'Rest API', isDone: false },
// //   { id: v1(), title: 'GraphQL', isDone: false },
// // ],
// // [todolistId2]: [
// //   { id: v1(), title: 'HTML&CSS2', isDone: true },
// //   { id: v1(), title: 'JS2', isDone: true },
// //   { id: v1(), title: 'ReactJS2', isDone: false },
// //   { id: v1(), title: 'Rest API2', isDone: false },
// //   { id: v1(), title: 'GraphQL2', isDone: false },
// // ],
// //}

export {};
