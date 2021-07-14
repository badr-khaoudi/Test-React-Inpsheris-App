/**
 *
 * Asynchronously loads the component for UserDetailsComponents
 *
 */

import loadable from 'utils/loadable';

export const User = loadable(() => import('./User'));
export const UsersNeverConnected = loadable(() =>
  import('./UsersNeverConnected'),
);
export const AllUsersConnected = loadable(() => import('./AllUsersConnected'));
export const UsersConnectedLessOrEqualTenTimes = loadable(() =>
  import('./UsersConnectedLessOrEqualTenTimes'),
);
export const LoginByUser = loadable(() => import('./LoginByUser'));
