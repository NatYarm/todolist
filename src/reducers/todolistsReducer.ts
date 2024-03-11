import { TodolistType, todolistsAPI } from '../api/todolist-api';
import { AppThunk } from '../store/store';

const initialState: TodolistEntityType[] = [];

export const todolistsReducer = (
  state: TodolistEntityType[] = initialState,
  action: TodolistsActionsType
): TodolistEntityType[] => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }));
    case 'REMOVE_TODOLIST':
      return state.filter(el => el.id !== action.todolistId);
    case 'ADD_TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state];
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

export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: 'SET_TODOLISTS', todolists } as const);

//thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(res.data));
  } catch (error) {}
};
export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .deleteTodolist(todolistId)
      .then(() => dispatch(removeTodolistAC(todolistId)));
  };
export const addTodolistTC =
  (title: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .createTodolist(title)
      .then(res => dispatch(addTodolistAC(res.data.data.item)));
  };
export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .updateTodolist(id, title)
      .then(() => dispatch(changeTodolistTitleAC(id, title)));
  };

//types
export type TodolistEntityType = TodolistType & { filter: FilterValuesType };

export type FilterValuesType = 'all' | 'completed' | 'active';

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type TodolistsActionsType =
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType;
