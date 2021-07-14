/**
 *
 * Asynchronously loads the component for CreateWidget
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
