/**
 *
 * Asynchronously loads the component for Empty
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
