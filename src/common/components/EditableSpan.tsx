import { useState, KeyboardEvent, memo } from 'react';

type Props = {
  oldTitle: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = memo(({ oldTitle, callback }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(oldTitle);

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const addTitleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateEdit();
    }
  };

  const activateEdit = () => {
    setEdit(!edit);
    if (edit) callback(newTitle);
  };

  return edit ? (
    <input value={newTitle} onChange={onChangeHandler} onKeyDown={addTitleOnKeyDown} onBlur={activateEdit} autoFocus />
  ) : (
    <span onDoubleClick={activateEdit}>{oldTitle}</span>
  );
});
