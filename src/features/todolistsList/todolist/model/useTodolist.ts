import { FilterValuesType, TodolistEntityType, todolistsActions, todolistsThunks } from '../../todolistsSlice';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { TaskStatuses } from 'common/enums';
import { selectTasks, tasksThunks } from '../../tasks/tasksSlice';
import { useSelector } from 'react-redux';

export const useTodolist = (todolist: TodolistEntityType, demo: boolean) => {
  const { id: todolistId, title, filter } = todolist;
  const tasks = useSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo) return;
    dispatch(tasksThunks.fetchTasks(todolistId));
  }, [dispatch, demo, todolistId]);

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTask({ todolistId, title }));
    },
    [dispatch, todolistId]
  );

  const removeTodolist = () => {
    dispatch(todolistsThunks.removeTodolist(todolistId));
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(todolistsThunks.changeTodolistTitle({ id: todolistId, title: newTitle }));
    },
    [dispatch, todolistId]
  );

  const changeFilterValue = (newFilterValue: FilterValuesType) => {
    dispatch(
      todolistsActions.changeTodolistFilter({
        id: todolistId,
        filter: newFilterValue,
      })
    );
  };

  let tasksForTodolist = tasks[todolistId];
  if (filter === 'active') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === TaskStatuses.New);
  } else if (filter === 'completed') {
    tasksForTodolist = tasks[todolistId].filter(t => t.status === TaskStatuses.Completed);
  }

  return {
    tasksForTodolist,
    todolistId,
    title,
    filter,
    addTask,
    removeTodolist,
    changeTodolistTitle,
    changeFilterValue,
  };
};
