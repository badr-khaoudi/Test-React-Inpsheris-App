/**
 *
 * Asynchronously loads the component for Community
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
export const CommunityModal = loadable(() => import('./modal'));
