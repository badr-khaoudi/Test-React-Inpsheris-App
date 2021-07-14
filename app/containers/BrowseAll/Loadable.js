/**
 *
 * Asynchronously loads the component for BrowseAll
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
