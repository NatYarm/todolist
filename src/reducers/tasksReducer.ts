import { v1 } from 'uuid';

import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolistsReducer';
import { todolistId1, todolistId2 } from './todolistsReducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

const initialState: TasksStateType = {
  [todolistId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'HTML&CSS2', isDone: true },
    { id: v1(), title: 'JS2', isDone: true },
    { id: v1(), title: 'ReactJS2', isDone: false },
    { id: v1(), title: 'Rest API2', isDone: false },
    { id: v1(), title: 'GraphQL2', isDone: false },
  ],
};

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          t => t.id !== action.taskId
        ),
      };
    case 'ADD_TASK':
      const newTask = { id: v1(), title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? { ...t, isDone: action.isDone } : t
        ),
      };
    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };

    case 'ADD_TODOLIST': {
      return {
        ...state,
        [action.todolistId]: [],
      };
    }

    case 'REMOVE_TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;

      // const {
      //   [action.todolistId]: [],
      //   ...rest
      // } = state;
      // return rest;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: 'REMOVE_TASK', todolistId, taskId } as const);

export const addTaskAC = (todolistId: string, title: string) =>
  ({ type: 'ADD_TASK', todolistId, title } as const);

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
) => ({ type: 'CHANGE_TASK_STATUS', todolistId, taskId, isDone } as const);

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
) => ({ type: 'CHANGE_TASK_TITLE', todolistId, taskId, title } as const);
