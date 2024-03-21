import { useState, KeyboardEvent } from 'react';

type AddItemProps = {
  callback: (title: string) => void;
};

const AddItemForm = ({ callback }: AddItemProps) => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(false);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
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

  const addTitleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title) {
      addTitleHandler();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={addTitleOnKeyDown}
        className={inputError ? 'input-error' : ''}
      />
      <button onClick={addTitleHandler}>+</button>
      {inputError && <p className="error-msg">Title is required</p>}
    </div>
  );
};

export default AddItemForm;
