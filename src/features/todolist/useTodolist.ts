import {
  FilterValuesType,
  TodolistEntityType,
  todolistsActions,
  changeTodolistTitleTC,
  removeTodolistTC,
} from '../../reducers/todolistsReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addTaskTC, fetchTasksTC } from '../../reducers/tasksReducer';
import { useCallback, useEffect } from 'react';
import { TaskStatuses } from '../../api/todolist-api';
import { selectTasks } from 'features/task/tasksSelectors';

export const useTodolist = (todolist: TodolistEntityType, demo: boolean) => {
  const { id: todolistId, title, filter } = todolist;

  const dispatch = useAppDispatch();
  const allTasks = useAppSelector(selectTasks);
  const tasks = allTasks[todolistId];

  useEffect(() => {
    if (demo) return;
    dispatch(fetchTasksTC(todolistId));
  }, [dispatch, demo, todolistId]);

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolistId, title));
    },
    [dispatch, todolistId]
  );

  const removeTodolist = () => {
    dispatch(removeTodolistTC(todolistId));
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
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

  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New);
  } else if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
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

// const tasksForTodolist = useMemo(() => {
//   let filteredTasks = tasks;

//   if (filter === 'active') {
//     filteredTasks = tasks.filter(t => !t.isDone);
//   } else if (filter === 'completed') {
//     filteredTasks = tasks.filter(t => t.isDone);
//   }

//   return filteredTasks;
// }, [filter, tasks]);
