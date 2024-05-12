import { ChangeEvent, FC } from 'react';

type CheckboxProps = {
  checked: boolean;
  callback: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ checked, callback }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.target.checked);
  };
  return <input type="checkbox" onChange={onChangeHandler} checked={checked} />;
};
