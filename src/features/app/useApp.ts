import { useCallback } from 'react';
import {
  TodolistEntityType,
  addTodolistAC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<TodolistEntityType[]>(
    state => state.todolists
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  return { todolists, addTodolist };
};
