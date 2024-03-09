import type { Meta, StoryObj } from '@storybook/react';
import App from '../../features/app/App';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';

const meta: Meta<typeof App> = {
  title: 'Todolists/AppWithRedux',
  component: App,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {};
