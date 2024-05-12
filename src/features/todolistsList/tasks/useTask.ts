import { TaskType } from 'features/todolistsList/todolistApi';
import { tasksThunks } from './tasksSlice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { TaskStatuses } from 'common/enums';

export const useTask = (todolistId: string, task: TaskType) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(tasksThunks.removeTask({ todolistId, taskId: task.id }));
  };
  const changeTaskStatus = (checked: boolean) => {
    const newStatus = checked ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(tasksThunks.updateTask({ todolistId, taskId: task.id, domainModel: { status: newStatus } }));
  };
  const changeTaskTitle = (newTitle: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId: task.id, domainModel: { title: newTitle } }));
  };
  return { task, removeTask, changeTaskStatus, changeTaskTitle };
};
