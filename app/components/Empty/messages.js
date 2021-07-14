/*
 * Empty Messages
 *
 * This contains all the text for the Empty component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Empty';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Empty component!',
  },
});
