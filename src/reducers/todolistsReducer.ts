import { v1 } from 'uuid';
import { TodolistType, todolistsAPI } from '../api/todolist-api';
import { Dispatch } from 'redux';

export type TodolistEntityType = TodolistType & { filter: FilterValuesType };

export type FilterValuesType = 'all' | 'completed' | 'active';

const initialState: TodolistEntityType[] = [];

export type TodolistReducerActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export const todolistsReducer = (
  state: TodolistEntityType[] = initialState,
  action: TodolistReducerActionsType
): TodolistEntityType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(el => el.id !== action.todolistId);
    }
    case 'ADD_TODOLIST': {
      const newTodolist: TodolistEntityType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all',
        addedDate: new Date(),
        order: 0,
      };

      return [newTodolist, ...state];
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map(el =>
        el.id === action.todolistId ? { ...el, title: action.title } : el
      );
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map(el =>
        el.id === action.todolistId
          ? { ...el, filter: action.newFilterValue }
          : el
      );
    }
    case 'SET_TODOLISTS': {
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }));
    }

    default:
      return state;
  }
};

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    todolistId,
  } as const;
};

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD_TODOLIST',
    title,
    todolistId: v1(),
  } as const;
};

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    title,
  } as const;
};

type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
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

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return { type: 'SET_TODOLISTS', todolists } as const;
};

export const fetchTodolistsTC = (dispatch: Dispatch) => {
  todolistsAPI.getTodolists().then(res => dispatch(setTodolistsAC(res.data)));
};
