/*
 * Community Messages
 *
 * This contains all the text for the Community container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Community';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Community container!',
  },
  favourites: {
    id: `${scope}.favourites`,
    defaultMessage: 'Favourites',
  },
  communities: {
    id: `${scope}.communities`,
    defaultMessage: 'Communities',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  select: {
    id: `${scope}.select`,
    defaultMessage: 'Select',
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Loading',
  },
  retry: {
    id: `${scope}.retry`,
    defaultMessage: 'Retry',
  },
  all: {
    id: `${scope}.all`,
    defaultMessage: 'All',
  },
  requestCommunity: {
    id: `${scope}.requestCommunity`,
    defaultMessage: 'Request a community',
  },
  close: {
    id: `${scope}.close`,
    defaultMessage: 'Close',
  },
  noFavorite: {
    id: `${scope}.noFavorite`,
    defaultMessage: "You don't have any favorite community.",
  },
  selectGroup: {
    id: `${scope}.selectGroup`,
    defaultMessage: 'Select group',
  },
  searchCommunity: {
    id: `${scope}.searchCommunity`,
    defaultMessage: 'Search community',
  },
});
