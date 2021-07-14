/**
 *
 * Asynchronously loads the component for DriveTree
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
