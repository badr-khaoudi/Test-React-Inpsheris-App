/**
 *
 * Asynchronously loads the component for Event
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
