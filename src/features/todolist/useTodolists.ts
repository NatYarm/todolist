import { useCallback, useEffect } from 'react';
import {
  TodolistEntityType,
  addTodolistTC,
  fetchTodolistsTC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const useTodolists = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<TodolistEntityType[]>(
    state => state.todolists
  );

  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, [dispatch]);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );

  return { todolists, addTodolist };
};
