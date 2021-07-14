/*
 * MyBoard Messages
 *
 * This contains all the text for the MyBoard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.MyBoard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyBoard container!',
  },
});
