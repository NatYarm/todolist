import { instance } from 'common/instance';
import { UpdateDomainTaskModel } from './tasks/tasksSlice';
import { TaskPriorities, TaskStatuses } from 'common/enums';
import { BaseResponseType } from 'common/types';

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<BaseResponseType<{ item: TodolistType }>>('todo-lists', {
      title,
    });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(arg: UpdateTodolistTitleArg) {
    return instance.put<BaseResponseType>(`todo-lists/${arg.id}`, {
      title: arg.title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(arg: CreateTaskArgs) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    });
  },
  deleteTask(arg: RemoveTaskArgs) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
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

type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};

export type RemoveTaskArgs = {
  todolistId: string;
  taskId: string;
};

export type CreateTaskArgs = { todolistId: string; title: string };

export type UpdateTaskArgs = {
  taskId: string;
  todolistId: string;
  domainModel: UpdateDomainTaskModel;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: Date;
  deadline: Date;
};

export type UpdateTodolistTitleArg = {
  id: string;
  title: string;
};

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
