import { useState, KeyboardEvent } from 'react';

type EditableSpanProps = {
  oldTitle: string;
  callback: (newTitle: string) => void;
};

const EditableSpan = ({ oldTitle, callback }: EditableSpanProps) => {
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
    <input
      value={newTitle}
      onChange={onChangeHandler}
      onKeyDown={addTitleOnKeyDown}
      onBlur={activateEdit}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEdit}>{oldTitle}</span>
  );
};

export default EditableSpan;

const Input = () => {
  const text = 'hello';
  return (
    <div>
      <SomeComponent text={text} />
      <h1>{}</h1>
    </div>
  );
};

const SomeComponent = (props: any) => {
  const onClickHandler = () => {
    return 'Hollywar';
  };

  return <div onClick={onClickHandler}>{props.text}</div>;
};
