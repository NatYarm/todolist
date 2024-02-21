import { TasksStateType } from '../../reducers/tasksReducer';
import { AppRootState } from '../store';

export const tasksSelector = (state: AppRootState): TasksStateType =>
  state.tasks;
