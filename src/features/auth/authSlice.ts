import { handleError } from 'utils/errorUtils';
import { Dispatch } from 'redux';
import { LoginParamsType, RESULT_CODE, authAPI } from 'api/todolist-api';
import { AppThunk } from 'store/store';
import { handleServerAppError } from '../../utils/errorUtils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { appActions } from '../app/appSlice';
import { clearTasksAndTodos } from 'common-actions/commonActions';

const slice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  selectors: {
    selectIsLoggedIn: sliceState => sliceState.isLoggedIn,
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;

export const loginTC =
  (data: LoginParamsType): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));

    try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: 'success' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));

  try {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
      dispatch(appActions.setAppStatus({ status: 'success' }));

      dispatch(clearTasksAndTodos());
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleError(error, dispatch);
  }
};
