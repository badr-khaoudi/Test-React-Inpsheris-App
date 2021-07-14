/**
 *
 * Asynchronously loads the component for CommentsP2V8
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
export const EditComment = loadable(() => import('./EditComment'));
