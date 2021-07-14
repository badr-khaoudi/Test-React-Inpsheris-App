/**
 *
 * Asynchronously loads the component for WidgetPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
