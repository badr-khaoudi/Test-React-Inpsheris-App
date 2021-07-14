/*
 * PrivateMessageWrapper Messages
 *
 * This contains all the text for the PrivateMessageWrapper component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PrivateMessageWrapper';

export default defineMessages({
  followerQuickpostSharing: {
    id: `${scope}.followerQuickpostSharing`,
    defaultMessage: 'shared on your wall',
  },
  followerQuickpost: {
    id: `${scope}.followerQuickpost`,
    defaultMessage: 'wrote on your wall',
  },
});
