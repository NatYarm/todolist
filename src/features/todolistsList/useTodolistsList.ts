import { useEffect } from 'react';
import { todolistsThunks, selectTodolists } from './todolistsSlice';
import { selectIsLoggedIn } from 'features/auth/model/authSlice';
import { selectTasks } from './tasks/tasksSlice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useSelector } from 'react-redux';

export const useTodolistsList = (demo: boolean) => {
  const dispatch = useAppDispatch();
  const todolists = useSelector(selectTodolists);
  const allTasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;
    dispatch(todolistsThunks.fetchTodolists());
  }, [dispatch, demo, isLoggedIn]);

  const addTodolist = (title: string) => {
    dispatch(todolistsThunks.addTodolist(title));
  };
  return { todolists, allTasks, addTodolist };
};
