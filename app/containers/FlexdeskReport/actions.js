/*
 *
 * FlexdeskReport actions
 *
 */

import { FLEXDESK, FLEXDESK_SUCCESS, FLEXDESK_ERROR } from './constants';

export function flexdesk(options, cancelToken) {
  return {
    type: FLEXDESK,
    options,
    cancelToken,
  };
}

export function flexdeskSuccess(data) {
  return {
    type: FLEXDESK_SUCCESS,
    data,
  };
}

export function flexdeskError(error) {
  return {
    type: FLEXDESK_ERROR,
    error,
  };
}
