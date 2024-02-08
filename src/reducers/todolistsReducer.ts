import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
];

export type TodolistReducerActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: TodolistReducerActionsType
): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(el => el.id !== action.todolistId);
    }
    case 'ADD_TODOLIST': {
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all',
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
