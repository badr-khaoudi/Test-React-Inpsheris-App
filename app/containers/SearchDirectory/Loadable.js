/**
 *
 * Asynchronously loads the component for SearchDirectory
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
