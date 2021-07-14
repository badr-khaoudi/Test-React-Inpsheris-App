/**
 *
 * Asynchronously loads the component for NotificationSupplier
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
