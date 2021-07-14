/*
 * GlobalContent Messages
 *
 * This contains all the text for the GlobalContent container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.GlobalContent';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the GlobalContent container!',
  },
});
