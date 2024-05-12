import { TasksStateType, tasksReducer, tasksThunks } from '../features/todolistsList/tasks/tasksSlice';
import { todolistsThunks } from '../features/todolistsList/todolistsSlice';
import { TestsAction } from 'common/types/types';
import { TaskPriorities, TaskStatuses } from 'common/enums';

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
  const action: TestsAction<typeof tasksThunks.removeTask.fulfilled> = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      todolistId: 'todolistId2',
      taskId: '2',
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy();
  //the same as
  //expect(endState['todolistId2'][0]).toBe('1');
  //expect(endState['todolistId2'][1]).toBe('3');
});

test('correct task should be added to correct array', () => {
  const action: TestsAction<typeof tasksThunks.addTask.fulfilled> = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
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
    },
  };

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status === TaskStatuses.Completed).toBe(false);
});

test('status of specified task should be changed', () => {
  const action: TestsAction<typeof tasksThunks.updateTask.fulfilled> = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: { todolistId: 'todolistId2', taskId: '2', domainModel: { status: TaskStatuses.New } },
  };

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status === TaskStatuses.Completed).toBe(false);
  expect(endState['todolistId1'][1].status === TaskStatuses.Completed).toBe(true);
});

test('title of specified task should be changed', () => {
  const action: TestsAction<typeof tasksThunks.updateTask.fulfilled> = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload: { todolistId: 'todolistId2', taskId: '2', domainModel: { title: 'beer' } },
  };

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].title).toBe('beer');
  expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is created', () => {
  const action: TestsAction<typeof todolistsThunks.addTodolist.fulfilled> = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: 'sdsds',
        title: 'new todolist',
        order: 0,
        addedDate: new Date(),
      },
    },
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('tasks should be added for todolist', () => {
  const action: TestsAction<typeof tasksThunks.fetchTasks.fulfilled> = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: {
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1',
    },
  };

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action
  );

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(0);
});
