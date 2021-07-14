/**
 *
 * Asynchronously loads the component for MyDraft
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
