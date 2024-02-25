import Task from '../../components/Task';
import type { Meta, StoryObj } from '@storybook/react';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../store/store';
import { TaskType } from '../../reducers/tasksReducer';
import { v1 } from 'uuid';

const meta: Meta<typeof Task> = {
  title: 'Todolists/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  args: {
    todolistId: 'lfd-sdbll3nf-5e',
    task: { id: 'lopdn5-dfg-5d3', title: 'React', isDone: true },
  },

  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDone: Story = {};

export const TaskIsNotDone: Story = {
  args: { task: { id: 'hnpdn5-dfg-5d3', title: 'JS', isDone: false } },
};

const TaskExample = () => {
  let task = useSelector<AppRootState, TaskType>(
    state => state.tasks['todolistId1'][0]
  );
  if (!task) task = { id: v1(), title: 'Default Task', isDone: false };

  return <Task todolistId="todolistId1" task={task} />;
};

export const TaskStory: Story = { render: () => <TaskExample /> };
