/**
 *
 * Asynchronously loads the component for EventBlock
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
