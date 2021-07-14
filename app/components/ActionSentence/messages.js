/*
 * ActionSentence Messages
 *
 * This contains all the text for the ActionSentence component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ActionSentence';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ActionSentence component!',
  },
  draft: {
    id: `${scope}.draft`,
    defaultMessage: 'is redacting {feedType} {in} {community}',
  },
  publish: {
    id: `${scope}.publish`,
    defaultMessage: 'has published {feedType} {in} {community}',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'has shared {feedType} in {community}',
  },
  jobOfferSentence: {
    id: `${scope}.jobOfferSentence`,
    defaultMessage: 'A new job offer was published in {community}',
  },
  comment: {
    id: `${scope}.comment`,
    defaultMessage: 'has commented {feedType} of {author} in {community}',
  },
  quickpost: {
    id: `${scope}.quickpost`,
    defaultMessage: 'a quickpost',
  },
  imageGallery: {
    id: `${scope}.imageGallery`,
    defaultMessage: 'an image gallery',
  },
  videoGallery: {
    id: `${scope}.videoGallery`,
    defaultMessage: 'a video gallery',
  },
  'transferred document': {
    id: `${scope}.document`,
    defaultMessage: 'a document',
  },
  document: {
    id: `${scope}.document`,
    defaultMessage: 'a document',
  },
  FAQquestion: {
    id: `${scope}.FAQquestion`,
    defaultMessage: 'a Question FAQ',
  },
  event: {
    id: `${scope}.event`,
    defaultMessage: 'an event',
  },
  meetingEvent: {
    id: `${scope}.meetingEvent`,
    defaultMessage: 'a global meeting',
  },
  article: {
    id: `${scope}.article`,
    defaultMessage: 'an article',
  },
  grandArticle: {
    id: `${scope}.grandArticle`,
    defaultMessage: 'a grand article',
  },
  jobOffer: {
    id: `${scope}.jobOffer`,
    defaultMessage: 'a job offer',
  },
  quickSharingOfTheLink: {
    id: `${scope}.quickSharingOfTheLink`,
    defaultMessage: 'a quick sharing of the link',
  },
  yammer: {
    id: `${scope}.yammer`,
    defaultMessage: 'yammer',
  },
});
