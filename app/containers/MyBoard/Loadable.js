/**
 *
 * Asynchronously loads the component for MyBoard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
