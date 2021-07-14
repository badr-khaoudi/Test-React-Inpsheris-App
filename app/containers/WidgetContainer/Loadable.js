/**
 *
 * Asynchronously loads the component for WidgetContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
