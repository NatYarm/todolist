import { useState, KeyboardEvent } from 'react';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';

type AddItemProps = {
  callback: (title: string) => void;
};

const AddItemForm = ({ callback }: AddItemProps) => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (event.key === 'Enter' && title) {
      addTitleHandler();
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
        label={inputError ? 'Title is required' : 'type smth...'}
        id="outlined-basic"
        variant="outlined"
        value={title}
        size="small"
        error={!!inputError}
        onKeyDown={addTitleOnKeyDown}
        onChange={onChangeHandler}
        sx={{ background: '#fff' }}
      />
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={addTitleOnKeyDown}
        className={inputError ? 'input-error' : ''}
      /> */}

      <Button
        variant="contained"
        onClick={addTitleHandler}
        style={styles}
        color="primary"
      >
        <Add />
      </Button>
      {/* {inputError && <p className="error-msg">Title is required</p>} */}
    </div>
  );
};

export default AddItemForm;
