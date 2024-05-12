import { TodolistType } from '../features/todolistsList/todolistApi';
import { RequestStatusType } from '../app/appSlice';
import {
  todolistsActions,
  FilterValuesType,
  TodolistEntityType,
  todolistsReducer,
  todolistsThunks,
} from '../features/todolistsList/todolistsSlice';
import { v1 } from 'uuid';
import { TestsAction } from '../common/types';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistEntityType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      order: 0,
      addedDate: new Date(),
      entityStatus: 'idle',
    },
  ];
});

test('correct todolist should be removed', () => {
  const action: TestsAction<typeof todolistsThunks.removeTodolist.fulfilled> = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload: {
      id: todolistId1,
    },
  };
  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolist: TodolistType = {
    title: 'New Todolist',
    order: 0,
    addedDate: new Date(),
    id: 'sdsfds',
  };
  const action: TestsAction<typeof todolistsThunks.addTodolist.fulfilled> = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload: { todolist: newTodolist },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolist.title);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTitle = 'New Title';

  const action: TestsAction<typeof todolistsThunks.changeTodolistTitle.fulfilled> = {
    type: todolistsThunks.changeTodolistTitle.fulfilled.type,
    payload: { id: todolistId2, title: newTitle },
  };

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTitle);
});

test('correct todolist should change its filter value', () => {
  const newFilterValue: FilterValuesType = 'completed';

  const action = todolistsActions.changeTodolistFilter({
    id: todolistId2,
    filter: newFilterValue,
  });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilterValue);
});
test('correct todolist should change its entity status', () => {
  const newStatus: RequestStatusType = 'loading';

  const action = todolistsActions.changeTodolistEntityStatus({
    id: todolistId2,
    status: newStatus,
  });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});
