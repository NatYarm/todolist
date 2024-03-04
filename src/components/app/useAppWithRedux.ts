import { useDispatch, useSelector } from 'react-redux';
import { todolistsSelector } from '../../store/selectors/todolistsSelector';
import { useCallback } from 'react';
import { addTodolistAC } from '../../reducers/todolistsReducer';

export const useAppWithRedux = () => {
  const dispatch = useDispatch();
  const todolists = useSelector(todolistsSelector);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  return { todolists, addTodolist };
};
