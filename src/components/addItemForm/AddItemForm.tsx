import { memo } from 'react';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useAddItemForm } from './useAddItemForm';

type AddItemProps = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

const AddItemForm = memo(({ addItem, disabled }: AddItemProps) => {
  const {
    title,
    inputError,
    onChangeHandler,
    addTitleOnKeyDown,
    addTitleHandler,
  } = useAddItemForm(addItem);

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
        disabled={disabled}
      />

      <Button
        variant="contained"
        onClick={addTitleHandler}
        style={styles}
        color="primary"
        disabled={disabled}
      >
        <Add />
      </Button>
    </div>
  );
});

export default AddItemForm;
