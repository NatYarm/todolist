import { TasksStateType } from '../App';
import { v1 } from 'uuid';

export const taskReducer = (
  state: TasksStateType,
  action: TaskReducer
): TasksStateType => {
  //const { todolistId, taskId, title } = action;
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          el => el.id !== action.taskId
        ),
      };
    }

    case 'ADD_TASK': {
      const newTaskId = v1();
      const newTask = { id: newTaskId, title: action.title, isDone: false };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      };
    }
    case 'ADD_NEW_TASKS': {
      return { ...state, [action.todolistId]: [] };
    }
    case 'CHANGE_TASK_STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el =>
          el.id === action.taskId ? { ...el, isDone: action.isDone } : el
        ),
      };
    }

    case 'UPDATE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el =>
          el.id === action.taskId ? { ...el, title: action.title } : el
        ),
      };
    }
    default:
      return state;
  }
};

type TaskReducer =
  | RemoveTask
  | AddTask
  | AddNewTasks
  | CangeTaskStatus
  | UpdateTask;

type RemoveTask = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return {
    type: 'REMOVE_TASK',
    todolistId,
    taskId,
  } as const;
};

type AddTask = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD_TASK',
    todolistId,
    title,
  } as const;
};

type AddNewTasks = ReturnType<typeof addNewTasksAC>;
export const addNewTasksAC = (todolistId: string) => {
  return {
    type: 'ADD_NEW_TASKS',
    todolistId,
  } as const;
};

type UpdateTask = ReturnType<typeof updateTaskAC>;
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  title: string
) => {
  return {
    type: 'UPDATE_TASK',
    todolistId,
    taskId,
    title,
  } as const;
};

type CangeTaskStatus = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
) => {
  return {
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    isDone,
  } as const;
};
