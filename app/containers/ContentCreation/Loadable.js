/**
 *
 * Asynchronously loads the component for ContentCreation
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
