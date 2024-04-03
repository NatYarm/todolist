import { useCallback, useEffect } from 'react';
import {
  addTodolistTC,
  fetchTodolistsTC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectIsLoggedIn } from 'reducers/authReducer';
import { selectTodolists } from './todolistsSelectors';

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);
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

  return { todolists, addTodolist };
};
