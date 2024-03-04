import { TodolistEntityType } from '../../reducers/todolistsReducer';
import { AppRootState } from '../store';

export const todolistsSelector = (state: AppRootState): TodolistEntityType[] =>
  state.todolists;
