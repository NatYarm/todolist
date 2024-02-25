import type { Meta, StoryObj } from '@storybook/react';

import AppWithRedux from '../../AppWithRedux';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';

const meta: Meta<typeof AppWithRedux> = {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

export const AppWithReduxStory: Story = {};
