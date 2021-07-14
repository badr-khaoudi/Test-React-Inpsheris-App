/**
 *
 * Asynchronously loads the component for FeedP2V8
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
