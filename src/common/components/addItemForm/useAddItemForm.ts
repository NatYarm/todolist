import { ChangeEvent, useState, KeyboardEvent } from 'react';

export const useAddItemForm = (addItem: (title: string) => void) => {
  const [title, setTitle] = useState('');
  const [inputError, setInputError] = useState(false);

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

  return {
    title,
    inputError,
    onChangeHandler,
    addTitleOnKeyDown,
    addTitleHandler,
    addItem,
  };
};
