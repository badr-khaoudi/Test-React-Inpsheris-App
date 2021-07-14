/**
 *
 * Asynchronously loads the component for TabConfig
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
