import { useCallback, useEffect } from 'react';
import {
  TodolistEntityType,
  addTodolistTC,
  fetchTodolistsTC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<TodolistEntityType[]>(
    state => state.todolists
  );

  useEffect(() => {
    if (demo) return;
    dispatch(fetchTodolistsTC());
  }, [dispatch, demo]);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  return { todolists, addTodolist };
};
