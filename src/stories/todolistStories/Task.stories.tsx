import Task from '../../components/task/Task';
import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../store/store';

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
    task: {
      id: 'lopdn5-dfg-5d3',
      title: 'React',
      status: TaskStatuses.Completed,
      todoListId: 'lfd-sdbll3nf-5e',
      description: '',
      priority: TaskPriorities.Low,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      order: 0,
    },
  },

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {};

export const TaskIsNotDone: Story = {
  args: {
    task: {
      id: 'hnpdn5-dfg-5d3',
      title: 'JS',
      status: TaskStatuses.New,
      todoListId: 'lfd-sdbll3nf-5e',
      description: '',
      priority: TaskPriorities.Low,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      order: 0,
    },
  },
};

const TaskExample = () => {
  let task = useSelector<AppRootState, TaskType>(
    state => state.tasks['todolistId1'][0]
  );
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

  return <Task todolistId="todolistId1" task={task} />;
};

export const TaskStory: Story = { render: () => <TaskExample /> };
