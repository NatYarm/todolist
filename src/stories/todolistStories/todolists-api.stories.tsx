import axios from 'axios';
import { useEffect, useState } from 'react';
import { todolistAPI } from '../../api/todolist-api';

export default {
  title: 'API-Todolists',
};

const settings = {
  withCredentials: true,
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then(res => {
      setState(res.data);
    });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist('New Todolist').then(res => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = 'c082c7548-4eff-48f8-ba63-484116024d4e';

  useEffect(() => {
    todolistAPI.deleteTodolist(todolistId).then(res => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = '082c7548-4eff-48f8-ba63-484116024d4e';

  useEffect(() => {
    todolistAPI.updateTodolist(todolistId, 'NEW TITLE').then(res => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
