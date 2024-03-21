import App from '../../features/app/App';
import { ReduxStoreProviderDecorator } from '../../store/ReduxStoreProviderDecorator';

export default {
  title: 'Todolists/App',
  component: App,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export const AppBaseExample = (props: any) => {
  return <App demo={true} />;
};
