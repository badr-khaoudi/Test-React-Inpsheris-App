/*
 * Comment Messages
 *
 * This contains all the text for the Comment container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Comment';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Comment container!',
  },
});
