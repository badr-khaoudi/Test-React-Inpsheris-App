/**
 *
 * Asynchronously loads the component for MyPublish
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
