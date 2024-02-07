import {
  addTodolistAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  todolistsReducer,
  changeTodolistTitleAC,
} from '../reducers/todolistsReducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../App';

test('correct todolist should be removed', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTodolistTitle = 'New Todolist';

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newTitle = 'New Title';

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodolistTitleAC(todolistId2, newTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTitle);
});

test('correct todolist should change its filter value', () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const newFilterValue: FilterValuesType = 'completed';

  const startState: TodolistType[] = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodolistFilterAC(todolistId2, newFilterValue);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilterValue);
});
