/*
 * HomeFeed Messages
 *
 * This contains all the text for the HomeFeed container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomeFeed';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomeFeed container!',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading',
  },
});
