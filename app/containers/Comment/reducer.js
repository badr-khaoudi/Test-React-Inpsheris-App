/*
 *
 * Comment reducer
 *
 */
import produce from 'immer';
import {} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const commentReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (/* draft */) => {
    switch (action.type) {
      default:
        return state;
    }
  });

export default commentReducer;
