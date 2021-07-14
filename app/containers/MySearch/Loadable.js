/**
 *
 * Asynchronously loads the component for MySearch
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
