/*
 *
 * Login actions
 *
 */

import { CURRENT_USER } from './constants';

export function currentUser() {
  return {
    type: CURRENT_USER,
  };
}
