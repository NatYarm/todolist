import { AppRootState } from 'store/store';

export const selectTasks = (state: AppRootState) => state.tasks;
