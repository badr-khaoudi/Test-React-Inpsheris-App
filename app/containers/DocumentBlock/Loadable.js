/**
 *
 * Asynchronously loads the component for DocumentBlock
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
