/*
 * QuickPost Messages
 *
 * This contains all the text for the QuickPost container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuickPost';

export default defineMessages({
  createQuickPost: {
    id: `${scope}.createQuickPost`,
    defaultMessage: 'Create quickpost',
  },
  communityName: {
    id: `${scope}.communityName`,
    defaultMessage: 'Community name/Category name',
  },
  selectCommunityTab: {
    id: `${scope}.selectCommunityTab`,
    defaultMessage: 'Select community tab',
  },
  whatsNew: {
    id: `${scope}.whatsNew`,
    defaultMessage: `What's new?`,
  },
  charactersLeft: {
    id: `${scope}.charactersLeft`,
    defaultMessage: '{size} characters left',
  },
  publish: {
    id: `${scope}.publish`,
    defaultMessage: 'Publish',
  },
});
