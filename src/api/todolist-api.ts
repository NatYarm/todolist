import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '3366c5e6-1cfe-418f-97d8-a19e39d7b27d',
  },
});
export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,

      model
    );
  },
};

//types
export type TodolistType = {
  id: string;
  addedDate: Date;
  order: number;
  title: string;
};

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Date;
  deadline: Date;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Date;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgent = 3,
  Later = 4,
}

type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: T;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Date;
  deadline: Date;
};

export enum RESULT_CODE {
  SUCCESS = 0,
  ERROR = 1,
  CAPTCHA_ERROR = 10,
}

export type ErrorType = {
  statusCode: number;
  messages: [
    {
      message: string;
      field: string;
    }
  ];
  error: string;
};
