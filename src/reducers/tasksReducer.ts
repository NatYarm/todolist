import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todolistsAPI,
} from '../api/todolist-api';
import { AppRootStateType, AppThunk } from '../store/store';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from './todolistsReducer';

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksActionsType
): TasksStateType => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, [action.todolistId]: action.tasks };
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          t => t.id !== action.taskId
        ),
      };
    case 'ADD_TASK':
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t =>
          t.id === action.taskId ? { ...t, ...action.model } : t
        ),
      };
    case 'ADD_TODOLIST':
      return { ...state, [action.todolist.id]: [] };
    case 'REMOVE_TODOLIST':
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    case 'SET_TODOLISTS': {
      const copyState = { ...state };
      action.todolists.forEach(tl => {
        copyState[tl.id] = [];
      });
      return copyState;
    }

    default:
      return state;
  }
};

const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: 'SET_TASKS', todolistId, tasks } as const);

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: 'REMOVE_TASK', todolistId, taskId } as const);

export const addTaskAC = (task: TaskType) =>
  ({ type: 'ADD_TASK', task } as const);

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  status: TaskStatuses
) => ({ type: 'CHANGE_TASK_STATUS', todolistId, taskId, status } as const);

export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: 'UPDATE_TASK', todolistId, taskId, model } as const);

//thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .getTasks(todolistId)
      .then(res => dispatch(setTasksAC(todolistId, res.data.items)));
  };
export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then(res => dispatch(removeTaskAC(todolistId, taskId)));
  };
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  dispatch => {
    todolistsAPI
      .createTask(todolistId, title)
      .then(res => dispatch(addTaskAC(res.data.data.item)));
  };
export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const tasks = getState().tasks;
    const task = tasks[todolistId].find(t => t.id === taskId);
    if (!task) return;

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      ...domainModel,
    };

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(() => dispatch(updateTaskAC(todolistId, taskId, domainModel)));
  };

// types
export type TasksStateType = {
  [key: string]: TaskType[];
};

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: Date;
  deadline?: Date;
};

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType;

// const initialState = {
//[todolistId1]: [
//   { id: v1(), title: 'HTML&CSS', isDone: true },
//   { id: v1(), title: 'JS', isDone: true },
//   { id: v1(), title: 'ReactJS', isDone: false },
//   { id: v1(), title: 'Rest API', isDone: false },
//   { id: v1(), title: 'GraphQL', isDone: false },
// ],
// [todolistId2]: [
//   { id: v1(), title: 'HTML&CSS2', isDone: true },
//   { id: v1(), title: 'JS2', isDone: true },
//   { id: v1(), title: 'ReactJS2', isDone: false },
//   { id: v1(), title: 'Rest API2', isDone: false },
//   { id: v1(), title: 'GraphQL2', isDone: false },
// ],
//}
