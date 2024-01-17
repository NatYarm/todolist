import { TodolistsType } from '../App';

export const todolistReducer = (
  state: TodolistsType[],
  action: TodolistReducer
): TodolistsType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(el => el.id !== action.todolistId);
    }
    case 'ADD_TODOLIST': {
      const newTodolist = {
        id: action.todolistId,
        title: action.title,
        filter: action.filter,
      };
      return [...state, newTodolist];
    }
    case 'UPDATE_TODOLIST': {
      return state.map(el =>
        el.id === action.todolistId ? { ...el, title: action.title } : el
      );
    }
    default:
      return state;
  }
};

type TodolistReducer = RemoveTodolist | AddTodolist | UpdateTodolist;

type RemoveTodolist = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    todolistId,
  } as const;
};

type AddTodolist = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD_TODOLIST',
    todolistId,
    title,
    filter: 'all',
  } as const;
};

type UpdateTodolist = ReturnType<typeof updateTodolistAC>;
export const updateTodolistAC = (todolistId: string, title: string) => {
  return {
    type: 'UPDATE_TODOLIST',
    todolistId,
    title,
  } as const;
};
