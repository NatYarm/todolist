import { RESULT_CODE, authAPI } from '../../api/todolist-api';
import { AppThunk } from '../../store/store';
import { authActions } from '../auth/authSlice';
import { handleError } from '../../utils/errorUtils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    selectIsInitialized: sliceState => sliceState.isInitialized,
    selectError: sliceState => sliceState.error,
    selectStatus: sliceState => sliceState.status,
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectIsInitialized, selectError, selectStatus } = slice.selectors;

//thunks

export const meTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    }
  } catch (error) {
    handleError(error, dispatch);
  }
  dispatch(appActions.setAppIsInitialized({ isInitialized: true }));
};

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed';

export type AppInitialState = ReturnType<typeof slice.getInitialState>;
