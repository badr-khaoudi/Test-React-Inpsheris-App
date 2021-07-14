/**
 *
 * Asynchronously loads the component for GlobalConnectionsComponents
 *
 */

import loadable from 'utils/loadable';

export const TotalConnections = loadable(() => import('./TotalConnections'));
export const ConnectionsPerDepartment = loadable(() =>
  import('./ConnectionsPerDepartment'),
);
export const ConnectionPerStatus = loadable(() =>
  import('./ConnectionPerStatus'),
);
export const SessionsByStatus = loadable(() => import('./SessionsByStatus'));
