/*
 * LivelyHeader Messages
 *
 * This contains all the text for the LivelyHeader component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.LivelyHeader';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "C'est le composant LivelyHeader!",
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Accueil',
  },
  usefulLinks: {
    id: `${scope}.usefulLinks`,
    defaultMessage: 'Liens utiles',
  },
  myDashboard: {
    id: `${scope}.myDashboard`,
    defaultMessage: 'Mon Dashboard',
  },
  communities: {
    id: `${scope}.communities`,
    defaultMessage: 'Communautés',
  },
  directory: {
    id: `${scope}.directory`,
    defaultMessage: 'Annuaire',
  },
});
