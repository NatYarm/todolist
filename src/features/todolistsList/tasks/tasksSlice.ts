import { createSlice } from '@reduxjs/toolkit';
import {
  CreateTaskArgs,
  RemoveTaskArgs,
  TaskType,
  UpdateTaskArgs,
  UpdateTaskModelType,
  todolistsAPI,
} from 'features/todolistsList/todolistApi';
import { handleServerNetworkError, handleServerAppError, createAppAsyncThunk } from 'common/utils';
import { appActions } from 'app/appSlice';
import { todolistsThunks } from '../todolistsSlice';
import { clearTasksAndTodos } from 'common/actions/commonActions';
import { ResultCode, TaskPriorities, TaskStatuses } from 'common/enums';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: sliceState => sliceState,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        tasks[index] = { ...tasks[index], ...action.payload.domainModel };
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodos.type, () => {
        return {};
      });
  },
});

//thunks

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.getTasks(todolistId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus({ status: 'success' }));
      return { tasks, todolistId };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.deleteTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const { todolistId, taskId, domainModel } = arg;
    try {
      const state = getState();
      const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId);
      if (!task) {
        dispatch(appActions.setAppError({ error: 'task not found' }));
        return rejectWithValue(null);
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

      const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const { selectTasks } = slice.selectors;
export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask };

// types
export type TasksStateType = {
  [key: string]: TaskType[];
};

export type UpdateDomainTaskModel = {
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
