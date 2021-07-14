/**
 *
 * Asynchronously loads the component for LivelyTransfer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
