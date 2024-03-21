import { useCallback, useEffect } from 'react';
import {
  addTodolistTC,
  fetchTodolistsTC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(state => state.todolists);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (demo) return;
    if (!isLoggedIn) return;
    dispatch(fetchTodolistsTC());
  }, [dispatch, demo, isLoggedIn]);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  return { todolists, addTodolist };
};
