/**
 *
 * Asynchronously loads the component for WidgetsP2V8
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
