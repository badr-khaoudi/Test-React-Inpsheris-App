/**
 *
 * Asynchronously loads the component for PrivateMessage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
