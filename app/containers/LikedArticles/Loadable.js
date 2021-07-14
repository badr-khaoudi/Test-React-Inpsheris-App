/**
 *
 * Asynchronously loads the component for LikedArticles
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
