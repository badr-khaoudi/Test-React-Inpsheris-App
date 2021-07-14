/**
 *
 * Asynchronously loads the component for Digest
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
