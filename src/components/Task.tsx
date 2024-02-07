import IconButton from '@mui/material/IconButton';
import EditableSpan from './EditableSpan';
import { Delete } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';

type TaskType = {
  todolistId: string;
  taskId: string;
};

const Task = () => {
  // function changeTaskStatusHandler(id: any, checked: any) {
  //   throw new Error('Function not implemented.');
  // }
  // const addTaskHandler = (title: string) => {
  //   addTask(todolistId, title);
  // };
  // const removeTaskHandler = (todolistId: string, taskId: string) => {
  //   removeTask(todolistId, taskId);
  // };
  // const removeTodolistHandler = () => {
  //   removeTodolist(todolistId);
  // };
  // const updateTodolistHandler = (title: string) => {
  //   updateTodolistTitle(todolistId, title);
  // };
  // const updateTaskHandler = (taskId: string, newTitle: string) => {
  //   updateTaskTitle(todolistId, taskId, newTitle);
  // };
  // const changeTaskStatusHandler = (taskId: string, checked: boolean) => {
  //   changeTaskStatus(todolistId, taskId, checked);
  // };
  // return (
  //   <li key={t.id} className={t.isDone ? 'task-done' : 'task'}>
  //     <Checkbox
  //       checked={t.isDone}
  //       callback={checked => changeTaskStatusHandler(t.id, checked)}
  //     />
  //     {/* <input
  // 		type="checkbox"
  // 		checked={t.isDone}
  // 		onChange={e =>
  // 			changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
  // 		}
  // 	/> */}
  //     <EditableSpan
  //       oldTitle={t.title}
  //       callback={newTitle => updateTaskHandler(t.id, newTitle)}
  //     />
  //     <IconButton
  //       aria-label="delete"
  //       size="small"
  //       onClick={() => {
  //         removeTaskHandler(todolistId, t.id);
  //       }}
  //     >
  //       <Delete fontSize="small" />
  //     </IconButton>
  //   </li>
  // );
};

export default Task;
