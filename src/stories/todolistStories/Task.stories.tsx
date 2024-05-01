import Task from '../../features/todolist/tasks/Task';
import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';
import { useAppSelector } from '../../store/store';
import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses, TaskType } from '../../api/todolist-api';

const meta: Meta<typeof Task> = {
  title: 'Todolists/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  args: {
    todolistId: 'lfd-sdbll3nf-5e',
    taskId: 'lsfls;as',
  },

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {};

export const TaskIsNotDone: Story = {
  args: {
    taskId: 'lsfkas;',
  },
};

const TaskExample = () => {
  let task = useAppSelector<TaskType>(state => state.tasks['todolistId1'][0]);
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

  return <Task todolistId="todolistId1" taskId={task.id} />;
};

export const TaskStory: Story = { render: () => <TaskExample /> };
