import { useCallback, useEffect } from 'react';
import { addTodolistTC, fetchTodolistsTC, selectTodolists } from './todolistsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { selectIsLoggedIn } from 'features/auth/authSlice';
import { selectTasks } from './tasks/tasksSlice';

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);
  const allTasks = useAppSelector(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;

    dispatch(fetchTodolistsTC());
  }, [dispatch, demo, isLoggedIn]);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  return { todolists, allTasks, addTodolist };
};
