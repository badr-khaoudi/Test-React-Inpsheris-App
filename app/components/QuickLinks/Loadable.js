/**
 *
 * Asynchronously loads the component for QuickLinks
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
