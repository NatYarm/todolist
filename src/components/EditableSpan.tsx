import { useState, KeyboardEvent } from 'react';

type EditableSpanProps = {
  oldTitle: string;
  callback: (title: string) => void;
};

const EditableSpan = ({ oldTitle, callback }: EditableSpanProps) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(oldTitle);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const addTitle = () => {
    callback(newTitle);
  };

  const addTitleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editFoo();
    }
  };

  const editFoo = () => {
    setEdit(!edit);
    if (edit) addTitle();
  };

  return edit ? (
    <input
      value={newTitle}
      onChange={onChangeHandler}
      onKeyDown={addTitleOnKeyDown}
      onBlur={editFoo}
      autoFocus
    />
  ) : (
    <span onDoubleClick={editFoo}>{oldTitle}</span>
  );
};

export default EditableSpan;
