/**
 *
 * Asynchronously loads the component for WidgetManager
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
