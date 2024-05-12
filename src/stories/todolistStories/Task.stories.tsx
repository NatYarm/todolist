import { useSelector } from 'react-redux';
import type { Meta, StoryObj } from '@storybook/react';
import { v1 } from 'uuid';
import Task from '../../features/todolistsList/tasks/Task';
import { ReduxStoreProviderDecorator } from 'app/store/ReduxStoreProviderDecorator';
import { selectTasks } from 'features/todolistsList/tasks/tasksSlice';
import { TaskPriorities, TaskStatuses } from 'common/enums';

const meta: Meta<typeof Task> = {
  title: 'Todolists/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  args: {
    todolistId: 'lfd-sdbll3nf-5e',
    //taskId: 'lsfls;as',
    //task,
  },

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {};

export const TaskIsNotDone: Story = {
  // args: {
  //   //taskId: 'lsfkas;',
  //   task,
  // },
};

const TaskExample = () => {
  //let task = useAppSelector<TaskType>(state => state.tasks['todolistId1'][0]);
  const tasks = useSelector(selectTasks);
  let task = tasks['todolistId1'][0];
  if (!task)
    task = {
      id: v1(),
      title: 'Default Task',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      description: '',
      priority: TaskPriorities.Low,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      order: 0,
    };

  return <Task todolistId="todolistId1" task={task} />; //taskId={task.id}
};

export const TaskStory: Story = { render: () => <TaskExample /> };
