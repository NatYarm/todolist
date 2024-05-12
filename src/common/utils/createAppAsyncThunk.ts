import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppRootState } from 'app/store/store';
import { BaseResponseType } from '../types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootState;
  dispatch: AppDispatch;
  rejectWithValue: null | BaseResponseType;
}>();
