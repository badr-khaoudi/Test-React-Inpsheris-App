/**
 *
 * Asynchronously loads the component for MessageDialog
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
