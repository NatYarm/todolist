import { useState, KeyboardEvent, ChangeEvent, memo } from 'react';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

type AddItemProps = {
  callback: (title: string) => void;
};

const AddItemForm = memo(({ callback }: AddItemProps) => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(false);
  console.log('AddItemForm called');

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    inputError && setInputError(false);
  };

  const addTitleHandler = () => {
    const trimmedTask = title.trim();
    if (trimmedTask) {
      callback(title);
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
});

export default AddItemForm;
