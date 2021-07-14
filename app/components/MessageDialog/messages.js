/*
 * MessageDialog Messages
 *
 * This contains all the text for the MessageDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MessageDialog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MessageDialog component!',
  },
});
