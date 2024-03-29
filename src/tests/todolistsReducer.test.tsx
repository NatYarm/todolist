import { TodolistType } from '../api/todolist-api';
import { RequestStatusType } from '../reducers/appReducer';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  todolistsReducer,
  changeTodolistTitleAC,
  FilterValuesType,
  TodolistEntityType,
  changeTodolistEntityStatusAC,
} from '../reducers/todolistsReducer';
import { v1 } from 'uuid';

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
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

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

  const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolist.title);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTitle = 'New Title';

  const action = changeTodolistTitleAC(todolistId2, newTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTitle);
});

test('correct todolist should change its filter value', () => {
  const newFilterValue: FilterValuesType = 'completed';

  const action = changeTodolistFilterAC(todolistId2, newFilterValue);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilterValue);
});
test('correct todolist should change its entity status', () => {
  const newStatus: RequestStatusType = 'loading';

  const action = changeTodolistEntityStatusAC(todolistId2, newStatus);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});
