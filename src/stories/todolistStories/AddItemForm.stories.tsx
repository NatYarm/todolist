import { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddItemForm, {
  AddItemProps,
} from '../../components/addItemForm/AddItemForm';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';

const meta: Meta<typeof AddItemForm> = {
  title: 'Todolists/AddItemForm',
  component: AddItemForm,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

const AddItemFormError = ({ addItem }: AddItemProps) => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    inputError && setInputError(false);
  };

  const addTitleHandler = () => {
    const trimmedTask = title.trim();
    if (trimmedTask) {
      addItem(title);
    } else {
      setInputError(true);
    }
    setTitle('');
  };

  const addTitleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTitleHandler();
    } else {
      inputError && setInputError(true);
    }
  };

  const styles = {
    maxWidth: '35px',
    maxHeight: '35px',
    minWidth: '35px',
    minHeight: '35px',
  };

  return (
    <div className="formWrapper">
      <TextField
        label={inputError ? 'Title is required' : 'enter title...'}
        variant="outlined"
        value={title}
        size="small"
        autoComplete="off"
        error={!!inputError}
        onKeyDown={addTitleOnKeyDown}
        onChange={onChangeHandler}
        sx={{ background: '#fff' }}
      />

      <Button
        variant="contained"
        onClick={addTitleHandler}
        style={styles}
        color="primary"
      >
        <Add />
      </Button>
    </div>
  );
};

export const AddItemFormErrorStory: Story = {
  render: () => (
    <AddItemFormError
      addItem={action('Button clicked with empty input field')}
    />
  ),
};
