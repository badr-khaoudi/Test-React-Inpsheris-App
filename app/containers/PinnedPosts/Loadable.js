/**
 *
 * Asynchronously loads the component for PinnedPosts
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
