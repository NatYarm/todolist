import { PayloadAction, Reducer, createSlice } from '@reduxjs/toolkit';
import { RESULT_CODE, TodolistType, todolistsAPI } from '../api/todolist-api';
import { AppRootState, AppThunk } from '../store/store';
import { handleError, handleServerAppError } from '../utils/errorUtils';
import { RequestStatusType, appActions } from './appReducer';
import { clearTasksAndTodos } from 'common-actions/commonActions';

//const initialState: TodolistEntityType[] = [];

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistEntityType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
      //return state.filter(tl => tl.id !== action.payload.id);
    },
    addTodolist: (
      state,
      action: PayloadAction<{
        todolist: TodolistType;
      }>
    ) => {
      state.unshift({
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      });
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
      }>
    ) => {
      // variant 1
      // const index = state.findIndex(todo => todo.id === action.payload.id);
      // state[index].title = action.payload.title;
      // variant 2
      const todolist = state.find(todo => todo.id === action.payload.id);
      if (todolist) todolist.title = action.payload.title;
    },
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
    setTodolists: (
      state,
      action: PayloadAction<{
        todolists: Array<TodolistType>;
      }>
    ) => {
      //variant 1
      // return action.payload.todolists.map(tl => ({
      //   ...tl,
      //   filter: 'all',
      //   entityStatus: 'idle',
      // }));
      // variant 2
      action.payload.todolists.forEach(todo => {
        state.push({ ...todo, filter: 'all', entityStatus: 'idle' });
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(clearTasksAndTodos.type, () => {
      return [];
    });
  },
});

export const todolistsReducer = slice.reducer;

export const todolistsActions = slice.actions;

// export const clearTodosDataAC = () => ({
//   type: 'CLEAR_DATA' as const,
// });

//thunks
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(todolistsActions.setTodolists({ todolists: res.data }));
    dispatch(appActions.setAppStatus({ status: 'success' }));
  } catch (error) {
    handleError(error, dispatch);
  }
};

export const removeTodolistTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    dispatch(
      todolistsActions.changeTodolistEntityStatus({ id, status: 'loading' })
    );
    try {
      await todolistsAPI.deleteTodolist(id);
      dispatch(todolistsActions.removeTodolist({ id }));
      dispatch(appActions.setAppStatus({ status: 'success' }));
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const addTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(
          todolistsActions.addTodolist({ todolist: res.data.data.item })
        );
        dispatch(appActions.setAppStatus({ status: 'success' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunk =>
  async dispatch => {
    try {
      const res = await todolistsAPI.updateTodolist(id, title);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(todolistsActions.changeTodolistTitle({ id, title }));
        dispatch(appActions.setAppStatus({ status: 'success' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };

//types
export type TodolistEntityType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type FilterValuesType = 'all' | 'completed' | 'active';
