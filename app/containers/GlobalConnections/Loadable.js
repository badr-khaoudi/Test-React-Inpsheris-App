/**
 *
 * Asynchronously loads the component for GlobalConnections
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
