import { TaskPriorities, TaskStatuses } from 'common/enums';
import { TasksStateType, tasksReducer } from '../features/todolistsList/tasks/tasksSlice';
import { TodolistEntityType, todolistsReducer, todolistsThunks } from '../features/todolistsList/todolistsSlice';
import { TestsAction } from '../common/types';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistEntityType> = [];

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

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
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

  const action: TestsAction<typeof todolistsThunks.removeTodolist.fulfilled> = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      id: 'todolistId2',
    },
  };

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
});
