import { RESULT_CODE, TodolistType, todolistsAPI } from '../api/todolist-api';
import { AppThunk } from '../store/store';
import { handleError, handleServerAppError } from '../utils/errorUtils';
import { RequestStatusType, setAppStatusAC } from './appReducer';

const initialState: TodolistEntityType[] = [];

export const todolistsReducer = (
  state: TodolistEntityType[] = initialState,
  action: TodolistsActionsType
): TodolistEntityType[] => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));
    case 'REMOVE_TODOLIST':
      return state.filter(el => el.id !== action.todolistId);
    case 'ADD_TODOLIST':
      return [
        { ...action.todolist, filter: 'all', entityStatus: 'idle' },
        ...state,
      ];
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(el =>
        el.id === action.todolistId ? { ...el, title: action.title } : el
      );
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(el =>
        el.id === action.todolistId
          ? { ...el, filter: action.newFilterValue }
          : el
      );
    case 'CHANGE_TODOLIST_ENTITY_STATUS':
      return state.map(el =>
        el.id === action.todolistId
          ? { ...el, entityStatus: action.status }
          : el
      );
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    todolistId,
  } as const;
};

export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'ADD_TODOLIST',
    todolist,
  } as const;
};

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    title,
  } as const;
};

export const changeTodolistFilterAC = (
  todolistId: string,
  newFilterValue: FilterValuesType
) => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    todolistId,
    newFilterValue,
  } as const;
};
export const changeTodolistEntityStatusAC = (
  todolistId: string,
  status: RequestStatusType
) =>
  ({
    type: 'CHANGE_TODOLIST_ENTITY_STATUS',
    todolistId,
    status,
  } as const);

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: 'SET_TODOLISTS', todolists } as const);

//thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(res.data));
    dispatch(setAppStatusAC('success'));
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
    try {
      await todolistsAPI.deleteTodolist(todolistId);
      dispatch(removeTodolistAC(todolistId));
      dispatch(setAppStatusAC('success'));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const addTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatusAC('success'));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  async dispatch => {
    try {
      const res = await todolistsAPI.updateTodolist(id, title);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(changeTodolistTitleAC(id, title));
        dispatch(setAppStatusAC('success'));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };

//types
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = 'all' | 'completed' | 'active';

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
type ChangeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

export type TodolistsActionsType =
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType;
