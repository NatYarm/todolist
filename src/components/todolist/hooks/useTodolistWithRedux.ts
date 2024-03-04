import { useDispatch, useSelector } from 'react-redux';
import {
  FilterValuesType,
  TodolistEntityType,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from '../../../reducers/todolistsReducer';
import { AppRootState } from '../../../store/store';
import { addTaskAC } from '../../../reducers/tasksReducer';
import { useCallback } from 'react';
import { TaskStatuses, TaskType } from '../../../api/todolist-api';

export const useTodolistWithRedux = (todolist: TodolistEntityType) => {
  const { id: todolistId, title, filter } = todolist;

  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    state => state.tasks[todolistId]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(todolistId, title));
    },
    [dispatch, todolistId]
  );

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todolistId));
  };

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },
    [dispatch, todolistId]
  );

  const changeFilterValue = (newFilterValue: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, newFilterValue));
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
