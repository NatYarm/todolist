import { TaskStatuses, TaskType } from '../../api/todolist-api';
import { updateTaskTC, removeTaskTC } from '../../reducers/tasksReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

export const useTask = (todolistId: string, taskId: string) => {
  const task = useAppSelector<TaskType>(
    state => state.tasks[todolistId].find(t => t.id === taskId) as TaskType
  );
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTaskTC(todolistId, taskId));
  };
  const changeTaskStatus = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(todolistId, taskId, { status: newStatus }));
  };
  const changeTaskTitle = (newTitle: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title: newTitle }));
  };
  return { task, removeTask, changeTaskStatus, changeTaskTitle };
};
