/**
 *
 * Asynchronously loads the component for CommunityStatisticsComponents
 *
 */

import loadable from 'utils/loadable';

export const ContentPerCommunities = loadable(() =>
  import('./ContentPerCommunities'),
);

export const ContentViewedByCommunity = loadable(() =>
  import('./ContentViewedByCommunity'),
);

export const ActivityOnACommunity = loadable(() =>
  import('./ActivityOnACommunity'),
);
