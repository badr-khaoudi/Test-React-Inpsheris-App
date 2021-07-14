/**
 *
 * Asynchronously loads the component for GlobalContent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
