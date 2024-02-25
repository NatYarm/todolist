import type { Meta, StoryObj } from '@storybook/react';
import EditableSpan from '../../components/EditableSpan';

const meta: Meta<typeof EditableSpan> = {
  title: 'Todolists/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    callback: {
      description: 'Title changed',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
  args: {
    oldTitle: 'HTML',
  },
};

// const meta: Meta<typeof EditableSpan> = {
//   title: 'TODOLISTS/EditableSpan',
//   component: EditableSpan,
//   parameters: {
//       // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
//       layout: 'centered',
//   },
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
//   tags: ['autodocs'],
//   // More on argTypes: https://storybook.js.org/docs/api/argtypes
//   argTypes: {
//       onChange: {
//           description: 'Value EditableSpan changed',
//           action: 'clicked'
//       },
//   },
//   args: {
//       value: 'HTML'
//   }
// }

// export default meta;
// type Story = StoryObj<typeof AddItemForm>;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const EditableSpanStory: Story = {};
