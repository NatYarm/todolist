import {
  TasksStateType,
  tasksActions,
  tasksReducer,
} from '../reducers/tasksReducer';

import { todolistsActions } from '../reducers/todolistsReducer';
import { TaskPriorities, TaskStatuses } from '../api/todolist-api';

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        description: '',
        priority: TaskPriorities.Low,
        addedDate: new Date(),
        startDate: new Date(),
        deadline: new Date(),
        order: 0,
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = tasksActions.removeTask({
    todolistId: 'todolistId2',
    taskId: '2',
  });
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
  //the same as
  //expect(endState['todolistId2'][0]).toBe('1');
  //expect(endState['todolistId2'][1]).toBe('3');
});

test('correct task should be added to correct array', () => {
  const action = tasksActions.addTask({
    task: {
      todoListId: 'todolistId2',
      title: 'juice',
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      addedDate: new Date(),
      startDate: new Date(),
      deadline: new Date(),
      description: '',
      order: 0,
      id: 'some id',
    },
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status === TaskStatuses.Completed).toBe(
    false
  );
});

test('status of specified task should be changed', () => {
  const action = tasksActions.updateTask({
    todolistId: 'todolistId2',
    taskId: '2',
    model: {
      status: TaskStatuses.New,
    },
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status === TaskStatuses.Completed).toBe(
    false
  );
  expect(endState['todolistId1'][1].status === TaskStatuses.Completed).toBe(
    true
  );
});

test('title of specified task should be changed', () => {
  const action = tasksActions.updateTask({
    todolistId: 'todolistId2',
    taskId: '2',
    model: { title: 'beer' },
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].title).toBe('beer');
  expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is created', () => {
  const action = todolistsActions.addTodolist({
    todolist: {
      id: 'sdsds',
      title: 'new todolist',
      order: 0,
      addedDate: new Date(),
    },
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
