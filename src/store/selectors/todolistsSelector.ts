import { TodolistType } from '../../reducers/todolistsReducer';
import { AppRootState } from '../store';

export const todolistsSelector = (state: AppRootState): TodolistType[] =>
  state.todolists;
