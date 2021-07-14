/*
 * FeedModal Messages
 *
 * This contains all the text for the FeedModal container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.FeedModal';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the FeedModal container!',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading',
  },
});
