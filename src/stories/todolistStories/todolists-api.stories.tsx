import { useEffect, useState } from 'react';
import { todolistAPI } from '../../api/todolist-api';

export default {
  title: 'API-Todolists',
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
  const [todolistTitle, setTodolistTitle] = useState<string>('');

  const createTodolist = () => {
    todolistAPI.createTodolist(todolistTitle).then(res => {
      setState(res.data);
    });
    setTodolistTitle('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist title"
          value={todolistTitle}
          onChange={e => setTodolistTitle(e.target.value)}
        />
        <button onClick={createTodolist}>create todolist</button>
      </div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(todolistId).then(res => {
      setState(res.data);
      setTodolistId('');
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />
        <button onClick={deleteTodolist}>delete todolist</button>
      </div>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [todolistTitle, setTodolistTitle] = useState<string>('');

  const updateTodolistTitle = () => {
    todolistAPI.updateTodolist(todolistId, todolistTitle).then(res => {
      setState(res.data);
    });
    setTodolistId('');
    setTodolistTitle('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />
        <input
          type="text"
          placeholder="todolist title"
          value={todolistTitle}
          onChange={e => setTodolistTitle(e.target.value)}
        />
        <button onClick={updateTodolistTitle}>update todolist</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then(res => setState(res.data));
    setTodolistId('');
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />

        <button onClick={getTasks}>get tasks</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');

  const createTask = () => {
    todolistAPI
      .createTask(todolistId, taskTitle)
      .then(res => setState(res.data));
    setTodolistId('');
    setTaskTitle('');
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />
        <input
          type="text"
          placeholder="task title"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />
        <button onClick={createTask}>create task</button>
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then(res => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />
        <input
          type="text"
          placeholder="task id"
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
        />
        <button onClick={deleteTask}>delete task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');

  const updateTask = () => {
    todolistAPI
      .updateTask(todolistId, taskId, taskTitle)
      .then(res => setState(res.data));
    setTodolistId('');
    setTaskId('');
    setTaskTitle('');
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={e => setTodolistId(e.target.value)}
        />
        <input
          type="text"
          placeholder="task id"
          value={taskId}
          onChange={e => setTaskId(e.target.value)}
        />
        <input
          type="text"
          placeholder="task title"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
        />
        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
};

//175f32e0-8f45-4c39-a657-de16128eff1f //todolistid
//e3a72075-95f8-4b92-a254-b949f5ec83c1  //taskid
