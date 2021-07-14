/**
 *
 * Asynchronously loads the component for Activities
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
