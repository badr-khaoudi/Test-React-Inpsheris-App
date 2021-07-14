/**
 *
 * Asynchronously loads the component for SortableList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
