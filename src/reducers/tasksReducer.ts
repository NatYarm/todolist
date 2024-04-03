import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  RESULT_CODE,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  UpdateTaskModelType,
  todolistsAPI,
} from '../api/todolist-api';
import { AppRootState, AppThunk } from '../store/store';
import { handleError, handleServerAppError } from '../utils/errorUtils';
import { appActions } from './appReducer';
import { todolistsActions } from './todolistsReducer';
import { clearTasksAndTodos } from 'common-actions/commonActions';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        todolistId: string;
      }>
    ) => {
      const tasksForTodolist = state[action.payload.todolistId];
      const index = tasksForTodolist.findIndex(
        t => t.id === action.payload.taskId
      );
      if (index !== -1) tasksForTodolist.splice(index, 1);

      //variant 2
      // return {
      //   ...state,
      //   [action.payload.todolistId]: state[action.payload.todolistId].filter(
      //     t => t.id !== action.payload.taskId
      //   ),
      // };
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksForTodolist = state[action.payload.task.todoListId];
      tasksForTodolist.unshift(action.payload.task);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        model: UpdateDomainTaskModelType;
        todolistId: string;
      }>
    ) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      tasks[index] = { ...tasks[index], ...action.payload.model };
    },
    setTasks: (
      state,
      action: PayloadAction<{
        tasks: Array<TaskType>;
        todolistId: string;
      }>
    ) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodos.type, () => {
        return {};
      });
  },

});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;


//thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));

    try {
      const res = await todolistsAPI.getTasks(todolistId);
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
      dispatch(appActions.setAppStatus({ status: 'success' }));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async dispatch => {
    try {
      await todolistsAPI.deleteTask(todolistId, taskId);
      dispatch(tasksActions.removeTask({ todolistId, taskId }));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));

    try {
      const res = await todolistsAPI.createTask(todolistId, title);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(tasksActions.addTask({ task: res.data.data.item }));
        dispatch(appActions.setAppStatus({ status: 'success' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ): AppThunk =>
  async (dispatch, getState: () => AppRootState) => {
    const tasks = getState().tasks;
    const task = tasks[todolistId].find(t => t.id === taskId);

    if (!task) {
      console.warn('task not found');
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      ...domainModel,
    };

    dispatch(appActions.setAppStatus({ status: 'loading' }));

    try {
      const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(
          tasksActions.updateTask({ todolistId, taskId, model: domainModel })
        );
        dispatch(appActions.setAppStatus({ status: 'success' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
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
