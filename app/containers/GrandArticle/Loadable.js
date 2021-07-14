/**
 *
 * Asynchronously loads the component for GrandArticle
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
