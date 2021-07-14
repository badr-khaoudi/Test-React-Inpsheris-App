/*
 *
 * Login reducer
 *
 */
import produce from 'immer';
import { CURRENT_USER } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case CURRENT_USER:
        break;
    }
  });

export default loginReducer;
