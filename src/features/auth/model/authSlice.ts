import { createSlice } from '@reduxjs/toolkit';
import { appActions } from 'app/appSlice';
import { ResultCode } from 'common/enums';
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils';
import { LoginParams, authAPI } from '../api/authApi';
import { clearTasksAndTodos } from 'common/actions/commonActions';

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
  selectors: {
    selectIsLoggedIn: sliceState => sliceState.isLoggedIn,
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await authAPI.login(arg);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return { isLoggedIn: true };
      } else {
        const showAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, dispatch, showAppError);
        return rejectWithValue(res.data);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authAPI.logout();
      if (res.data.resultCode === ResultCode.success) {
        dispatch(clearTasksAndTodos());
        dispatch(appActions.setAppStatus({ status: 'success' }));
        return { isLoggedIn: false };
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

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.success) {
        return { isLoggedIn: true };
      } else {
        handleServerAppError(res.data, dispatch, false);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setAppIsInitialized({ isInitialized: true }));
    }
  }
);

export const authReducer = slice.reducer;
export const { selectIsLoggedIn } = slice.selectors;
export const authThunks = { login, logout, initializeApp };
