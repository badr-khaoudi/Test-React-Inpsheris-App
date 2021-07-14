/**
 *
 * Asynchronously loads the component for SocialWall
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
