/**
 *
 * Asynchronously loads the component for Share
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
