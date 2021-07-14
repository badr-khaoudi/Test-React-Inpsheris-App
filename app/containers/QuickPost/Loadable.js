/**
 *
 * Asynchronously loads the component for QuickPost
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
