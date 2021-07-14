/**
 *
 * Asynchronously loads the component for DigestPreview
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
