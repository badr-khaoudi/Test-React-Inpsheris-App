/**
 *
 * Asynchronously loads the component for LinkDocumentLibrary
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
