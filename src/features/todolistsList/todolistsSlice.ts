import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { clearTasksAndTodos } from 'common/actions/commonActions';
import { TodolistType, UpdateTodolistTitleArg, todolistsAPI } from 'features/todolistsList/todolistApi';
import { RequestStatusType, appActions } from 'app/appSlice';
import { handleServerNetworkError, handleServerAppError, createAppAsyncThunk } from 'common/utils';
import { ResultCode } from 'common/enums';

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistEntityType[],
  selectors: {
    selectTodolists: sliceState => sliceState,
  },

  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{
        id: string;
        filter: FilterValuesType;
      }>
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: RequestStatusType;
      }>
    ) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        // const updatedState: TodolistEntityType[] = [];

        // action.payload.todolists.forEach(todo => {
        //   updatedState.push({ ...todo, filter: 'all', entityStatus: 'idle' });
        // });

        // return updatedState;
        return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
      })

      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        });
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todolist = state.find(todo => todo.id === action.payload.id);
        if (todolist) todolist.title = action.payload.title;
      })
      .addCase(clearTasksAndTodos.type, () => {
        return [];
      });
  },
});

export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/fetchTodolists`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: 'success' }));
      return { todolists: res.data };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
  `${slice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      await todolistsAPI.deleteTodolist(id);
      dispatch(appActions.setAppStatus({ status: 'success' }));
      return { id };
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return { todolist: res.data.data.item };
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

export const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArg, UpdateTodolistTitleArg>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.updateTodolist(arg);
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

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const { selectTodolists } = slice.selectors;
export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle };

//types
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = 'all' | 'completed' | 'active';
