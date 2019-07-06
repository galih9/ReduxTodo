import * as types from '../type';

// export const getData = () => ({
//   type: types.ADD_TODO,
//   payload: value
// })

export const addTodos = value => ({
  type: types.ADD_TODO,
  payload: value
});

export const editTodos = value => ({
  type: types.EDIT_TODOS,
  payload: value
});

export const removeTodos = id => ({
  type: types.REMOVE_TODOS,
  payload: id
})