/*
 * NotificationItemText Messages
 *
 * This contains all the text for the NotificationItemText component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NotificationItemText';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NotificationItemText component!',
  },
  quickpost: {
    id: `${scope}.quickpost`,
    defaultMessage: 'quickpost',
  },
  'follower quickpost': {
    id: `${scope}.followerQuickpost`,
    defaultMessage: 'quickpost',
  },
  imageGallery: {
    id: `${scope}.imageGallery`,
    defaultMessage: 'image gallery',
  },
  videoGallery: {
    id: `${scope}.videoGallery`,
    defaultMessage: 'video gallery',
  },
  document: {
    id: `${scope}.document`,
    defaultMessage: 'document',
  },
  FAQquestion: {
    id: `${scope}.FAQquestion`,
    defaultMessage: 'Question FAQ',
  },
  event: {
    id: `${scope}.event`,
    defaultMessage: 'event',
  },
  meetingEvent: {
    id: `${scope}.meetingEvent`,
    defaultMessage: 'global meeting',
  },
  article: {
    id: `${scope}.article`,
    defaultMessage: 'article',
  },
  grandArticle: {
    id: `${scope}.grandArticle`,
    defaultMessage: 'grand article',
  },
  jobOffer: {
    id: `${scope}.jobOffer`,
    defaultMessage: 'job offer',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'share',
  },
  quickSharingOfTheLink: {
    id: `${scope}.quickSharingOfTheLink`,
    defaultMessage: 'quick sharing of the link',
  },
  remindEventHappens: {
    id: `${scope}.remindEventHappens`,
    defaultMessage: 'Reminder: the event {contentLink} is about to start',
  },
  profileAskToCreateArticle: {
    id: `${scope}.profileAskToCreateArticle`,
    defaultMessage:
      '{sourceUser} has asked to publish an article in {community}',
  },
  communityAskToCreateArticle: {
    id: `${scope}.communityAskToCreateArticle`,
    defaultMessage: 'An article needs to be validated {contentLink}',
  },
  profileCreateArticle: {
    id: `${scope}.profileCreateArticle`,
    defaultMessage: '{sourceUser} has created an article in {community}',
  },
  communityCreateArticle: {
    id: `${scope}.communityCreateArticle`,
    defaultMessage: 'New article was created {contentLink}',
  },
  profileModifyArticle: {
    id: `${scope}.profileModifyArticle`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s article in {community}`,
  },
  communityModifyArticle: {
    id: `${scope}.communityModifyArticle`,
    defaultMessage: `An article was modified {contentLink}`,
  },
  profileArchiveArticle: {
    id: `${scope}.profileArchiveArticle`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s article in {community}`,
  },
  communityArchiveArticle: {
    id: `${scope}.communityArchiveArticle`,
    defaultMessage: `An article was archived {contentLink}`,
  },
  profileAcceptToCreateArticle: {
    id: `${scope}.profileAcceptToCreateArticle`,
    defaultMessage:
      '{sourceUser} has accepted to create article in {community}',
  },
  communityAcceptToCreateArticle: {
    id: `${scope}.communityAcceptToCreateArticle`,
    defaultMessage: 'An article was validated {contentLink}',
  },
  profileShareArticle: {
    id: `${scope}.profileShareArticle`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s article {contentLink} in {community}`,
  },
  communityShareArticle: {
    id: `${scope}.communityShareArticle`,
    defaultMessage: 'An article was shared {contentLink}',
  },
  profileCopyArticle: {
    id: `${scope}.profileCopyArticle`,
    defaultMessage: '{sourceUser} has copied your article {contentLink}',
  },
  communityCopyArticle: {
    id: `${scope}.communityCopyArticle`,
    defaultMessage: 'An article was copied {contentLink}',
  },
  profileAskToRevalidateArticle: {
    id: `${scope}.profileAskToRevalidateArticle`,
    defaultMessage:
      '{sourceUser} has asked to revalidate an article in {community}',
  },
  communityAskToRevalidateArticle: {
    id: `${scope}.communityAskToRevalidateArticle`,
    defaultMessage: 'An article needs to be validated again {contentLink}',
  },
  profileAskToCreateDocument: {
    id: `${scope}.profileAskToCreateDocument`,
    defaultMessage: '{sourceUser} has asked to publish document in {community}',
  },
  communityAskToCreateDocument: {
    id: `${scope}.communityAskToCreateDocument`,
    defaultMessage: 'A document needs to be validated {contentLink}',
  },
  profileCreateDocument: {
    id: `${scope}.profileCreateDocument`,
    defaultMessage: '{sourceUser} has created a document in {community}',
  },
  communityCreateDocument: {
    id: `${scope}.communityCreateDocument`,
    defaultMessage: 'New document was created {contentLink}',
  },
  profileModifyDocument: {
    id: `${scope}.profileModifyDocument`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s document in {community}`,
  },
  communityModifyDocument: {
    id: `${scope}.communityModifyDocument`,
    defaultMessage: `A document was modified {contentLink}`,
  },
  profileArchiveDocument: {
    id: `${scope}.profileArchiveDocument`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s document in {community}`,
  },
  communityArchiveDocument: {
    id: `${scope}.communityArchiveDocument`,
    defaultMessage: 'A document was archived {contentLink}',
  },
  profileAcceptToCreateDocument: {
    id: `${scope}.profileAcceptToCreateDocument`,
    defaultMessage:
      '{sourceUser} has accepted to create document in {community}',
  },
  communityAcceptToCreateDocument: {
    id: `${scope}.communityAcceptToCreateDocument`,
    defaultMessage: 'A document was validated {contentLink}',
  },
  profileShareDocument: {
    id: `${scope}.profileShareDocument`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s document {contentLink} in {community}`,
  },
  communityShareDocument: {
    id: `${scope}.communityShareDocument`,
    defaultMessage: 'A document was shared {contentLink}',
  },
  profileCopyDocument: {
    id: `${scope}.profileCopyDocument`,
    defaultMessage: '{sourceUser} has copied your document {contentLink}',
  },
  communityCopyDocument: {
    id: `${scope}.communityCopyDocument`,
    defaultMessage: 'A document was copied {contentLink}',
  },
  profileAskToRevalidateDocument: {
    id: `${scope}.profileAskToRevalidateDocument`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a document in {community}',
  },
  communityAskToRevalidateDocument: {
    id: `${scope}.communityAskToRevalidateDocument`,
    defaultMessage: 'A document needs to be validated again {contentLink}',
  },
  profileAskToCreateQuickpost: {
    id: `${scope}.profileAskToCreateQuickpost`,
    defaultMessage:
      '{sourceUser} has asked to publish quickpost in {community}',
  },
  communityAskToCreateQuickpost: {
    id: `${scope}.communityAskToCreateQuickpost`,
    defaultMessage: 'A quickpost needs to be validated {contentLink}',
  },
  profileCreateQuickpost: {
    id: `${scope}.profileCreateQuickpost`,
    defaultMessage: '{sourceUser} has created a quickpost in {community}',
  },
  communityCreateQuickpost: {
    id: `${scope}.communityCreateQuickpost`,
    defaultMessage: 'New quickpost was created {contentLink}',
  },
  profileModifyQuickpost: {
    id: `${scope}.profileModifyQuickpost`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s quickpost in {community}`,
  },
  communityModifyQuickpost: {
    id: `${scope}.communityModifyQuickpost`,
    defaultMessage: `A quickpost was modified {contentLink}`,
  },
  profileArchiveQuickpost: {
    id: `${scope}.profileArchiveQuickpost`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s quickpost in {community}`,
  },
  communityArchiveQuickpost: {
    id: `${scope}.communityArchiveQuickpost`,
    defaultMessage: 'A quickpost was archived {contentLink}',
  },
  profileAcceptToCreateQuickpost: {
    id: `${scope}.profileAcceptToCreateQuickpost`,
    defaultMessage:
      '{sourceUser} has accepted to create quickpost in {community}',
  },
  communityAcceptToCreateQuickpost: {
    id: `${scope}.communityAcceptToCreateQuickpost`,
    defaultMessage: 'A quickpost was validated {contentLink}',
  },
  profileShareQuickpost: {
    id: `${scope}.profileShareQuickpost`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s quickpost {contentLink} in {community}`,
  },
  communityShareQuickpost: {
    id: `${scope}.communityShareQuickpost`,
    defaultMessage: 'A quickpost was shared {contentLink}',
  },
  profileCopyQuickpost: {
    id: `${scope}.profileCopyQuickpost`,
    defaultMessage: '{sourceUser} has copied your quickpost {contentLink}',
  },
  communityCopyQuickpost: {
    id: `${scope}.communityCopyQuickpost`,
    defaultMessage: 'A quickpost was copied {contentLink}',
  },
  profileAskToRevalidateQuickpost: {
    id: `${scope}.profileAskToRevalidateQuickpost`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a quickpost in {community}',
  },
  communityAskToRevalidateQuickpost: {
    id: `${scope}.communityAskToRevalidateQuickpost`,
    defaultMessage: 'A quickpost needs to be validated again {contentLink}',
  },
  profileAskToCreateEvent: {
    id: `${scope}.profileAskToCreateEvent`,
    defaultMessage: '{sourceUser} has asked to publish event in {community}',
  },
  communityAskToCreateEvent: {
    id: `${scope}.communityAskToCreateEvent`,
    defaultMessage: 'An event needs to be validated {contentLink}',
  },
  profileCreateEvent: {
    id: `${scope}.profileCreateEvent`,
    defaultMessage: '{sourceUser} has created an event in {community}',
  },
  communityCreateEvent: {
    id: `${scope}.communityCreateEvent`,
    defaultMessage: 'New event was created {contentLink}',
  },
  profileModifyEvent: {
    id: `${scope}.profileModifyEvent`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s event in {community}`,
  },
  communityModifyEvent: {
    id: `${scope}.communityModifyEvent`,
    defaultMessage: `An event was modified {contentLink}`,
  },
  profileArchiveEvent: {
    id: `${scope}.profileArchiveEvent`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s event in {community}`,
  },
  communityArchiveEvent: {
    id: `${scope}.communityArchiveEvent`,
    defaultMessage: 'An event was archived {contentLink}',
  },
  profileAcceptToCreateEvent: {
    id: `${scope}.profileAcceptToCreateEvent`,
    defaultMessage: '{sourceUser} has accepted to create event in {community}',
  },
  communityAcceptToCreateEvent: {
    id: `${scope}.communityAcceptToCreateEvent`,
    defaultMessage: 'An event was validated {contentLink}',
  },
  profileShareEvent: {
    id: `${scope}.profileShareEvent`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s event {contentLink} in {community}`,
  },
  communityShareEvent: {
    id: `${scope}.communityShareEvent`,
    defaultMessage: 'An event was shared {contentLink}',
  },
  profileCopyEvent: {
    id: `${scope}.profileCopyEvent`,
    defaultMessage: '{sourceUser} has copied your event {contentLink}',
  },
  communityCopyEvent: {
    id: `${scope}.communityCopyEvent`,
    defaultMessage: 'An event was copied {contentLink}',
  },
  profileAskToRevalidateEvent: {
    id: `${scope}.profileAskToRevalidateEvent`,
    defaultMessage:
      '{sourceUser} has asked to revalidate an event in {community}',
  },
  communityAskToRevalidateEvent: {
    id: `${scope}.communityAskToRevalidateEvent`,
    defaultMessage: 'An event needs to be validated again {contentLink}',
  },
  profileAskToCreateImageGallery: {
    id: `${scope}.profileAskToCreateImageGallery`,
    defaultMessage:
      '{sourceUser} has asked to publish image gallery in {community}',
  },
  communityAskToCreateImageGallery: {
    id: `${scope}.communityAskToCreateImageGallery`,
    defaultMessage: 'An image gallery needs to be validated {contentLink}',
  },
  profileCreateImageGallery: {
    id: `${scope}.profileCreateImageGallery`,
    defaultMessage: '{sourceUser} has created an image gallery in {community}',
  },
  communityCreateImageGallery: {
    id: `${scope}.communityCreateImageGallery`,
    defaultMessage: 'New image gallery was created {contentLink}',
  },
  profileModifyImageGallery: {
    id: `${scope}.profileModifyImageGallery`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s image gallery in {community}`,
  },
  communityModifyImageGallery: {
    id: `${scope}.communityModifyImageGallery`,
    defaultMessage: `An image gallery was modified {contentLink}`,
  },
  profileArchiveImageGallery: {
    id: `${scope}.profileArchiveImageGallery`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s image gallery in {community}`,
  },
  communityArchiveImageGallery: {
    id: `${scope}.communityArchiveImageGallery`,
    defaultMessage: 'An image gallery was archived {contentLink}',
  },
  profileAcceptToCreateImageGallery: {
    id: `${scope}.profileAcceptToCreateImageGallery`,
    defaultMessage:
      '{sourceUser} has accepted to create image gallery in {community}',
  },
  communityAcceptToCreateImageGallery: {
    id: `${scope}.communityAcceptToCreateImageGallery`,
    defaultMessage: 'An image gallery was validated {contentLink}',
  },
  profileShareImageGallery: {
    id: `${scope}.profileShareImageGallery`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s image gallery {contentLink} in {community}`,
  },
  communityShareImageGallery: {
    id: `${scope}.communityShareImageGallery`,
    defaultMessage: 'An image gallery was shared {contentLink}',
  },
  profileCopyImageGallery: {
    id: `${scope}.profileCopyImageGallery`,
    defaultMessage: '{sourceUser} has copied your image gallery {contentLink}',
  },
  communityCopyImageGallery: {
    id: `${scope}.communityCopyImageGallery`,
    defaultMessage: 'An image gallery was copied {contentLink}',
  },
  profileAskToRevalidateImageGallery: {
    id: `${scope}.profileAskToRevalidateImageGallery`,
    defaultMessage:
      '{sourceUser} has asked to revalidate an image gallery in {community}',
  },
  communityAskToRevalidateImageGallery: {
    id: `${scope}.communityAskToRevalidateImageGallery`,
    defaultMessage:
      'An image gallery needs to be validated again {contentLink}',
  },
  profileAskToCreateGrandArticle: {
    id: `${scope}.profileAskToCreateGrandArticle`,
    defaultMessage:
      '{sourceUser} has asked to publish grand article in {community}',
  },
  communityAskToCreateGrandArticle: {
    id: `${scope}.communityAskToCreateGrandArticle`,
    defaultMessage: 'A grand article needs to be validated {contentLink}',
  },
  profileCreateGrandArticle: {
    id: `${scope}.profileCreateGrandArticle`,
    defaultMessage: '{sourceUser} has created a grand article in {community}',
  },
  communityCreateGrandArticle: {
    id: `${scope}.communityCreateGrandArticle`,
    defaultMessage: 'New grand article was created {contentLink}',
  },
  profileModifyGrandArticle: {
    id: `${scope}.profileModifyGrandArticle`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s grand article in {community}`,
  },
  communityModifyGrandArticle: {
    id: `${scope}.communityModifyGrandArticle`,
    defaultMessage: `A grand article was modified {contentLink}`,
  },
  profileArchiveGrandArticle: {
    id: `${scope}.profileArchiveGrandArticle`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s grand article in {community}`,
  },
  communityArchiveGrandArticle: {
    id: `${scope}.communityArchiveGrandArticle`,
    defaultMessage: 'A grand article was archived {contentLink}',
  },
  profileAcceptToCreateGrandArticle: {
    id: `${scope}.profileAcceptToCreateGrandArticle`,
    defaultMessage:
      '{sourceUser} has accepted to create grand article in {community}',
  },
  communityAcceptToCreateGrandArticle: {
    id: `${scope}.communityAcceptToCreateGrandArticle`,
    defaultMessage: 'A grand article was validated {contentLink}',
  },
  profileShareGrandArticle: {
    id: `${scope}.profileShareGrandArticle`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s grand article {contentLink} in {community}`,
  },
  communityShareGrandArticle: {
    id: `${scope}.communityShareGrandArticle`,
    defaultMessage: 'A grand article was shared {contentLink}',
  },
  profileCopyGrandArticle: {
    id: `${scope}.profileCopyGrandArticle`,
    defaultMessage: '{sourceUser} has copied your grand article {contentLink}',
  },
  communityCopyGrandArticle: {
    id: `${scope}.communityCopyGrandArticle`,
    defaultMessage: 'A grand article was copied {contentLink}',
  },
  profileAskToRevalidateGrandArticle: {
    id: `${scope}.profileAskToRevalidateGrandArticle`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a grand article in {community}',
  },
  communityAskToRevalidateGrandArticle: {
    id: `${scope}.communityAskToRevalidateGrandArticle`,
    defaultMessage: 'A grand article needs to be validated again {contentLink}',
  },
  profileAskToCreateQuickSharingOfTheLink: {
    id: `${scope}.profileAskToCreateQuickSharingOfTheLink`,
    defaultMessage:
      '{sourceUser} has asked to publish quick sharing of the link in {community}',
  },
  communityAskToCreateQuickSharingOfTheLink: {
    id: `${scope}.communityAskToCreateQuickSharingOfTheLink`,
    defaultMessage:
      'A quick sharing of the link needs to be validated {contentLink}',
  },
  profileCreateQuickSharingOfTheLink: {
    id: `${scope}.profileCreateQuickSharingOfTheLink`,
    defaultMessage:
      '{sourceUser} has created a quick sharing of the link in {community}',
  },
  communityCreateQuickSharingOfTheLink: {
    id: `${scope}.communityCreateQuickSharingOfTheLink`,
    defaultMessage: 'New quick sharing of the link was created {contentLink}',
  },
  profileModifyQuickSharingOfTheLink: {
    id: `${scope}.profileModifyQuickSharingOfTheLink`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s quick sharing of the link in {community}`,
  },
  communityModifyQuickSharingOfTheLink: {
    id: `${scope}.communityModifyQuickSharingOfTheLink`,
    defaultMessage: `A quick sharing of the link was modified {contentLink}`,
  },
  profileArchiveQuickSharingOfTheLink: {
    id: `${scope}.profileArchiveQuickSharingOfTheLink`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s quick sharing of the link in {community}`,
  },
  communityArchiveQuickSharingOfTheLink: {
    id: `${scope}.communityArchiveQuickSharingOfTheLink`,
    defaultMessage: 'A quick sharing of the link was archived {contentLink}',
  },
  profileAcceptToCreateQuickSharingOfTheLink: {
    id: `${scope}.profileAcceptToCreateQuickSharingOfTheLink`,
    defaultMessage:
      '{sourceUser} has accepted to create quick sharing of the link in {community}',
  },
  communityAcceptToCreateQuickSharingOfTheLink: {
    id: `${scope}.communityAcceptToCreateQuickSharingOfTheLink`,
    defaultMessage: 'A quick sharing of the link was validated {contentLink}',
  },
  profileShareQuickSharingOfTheLink: {
    id: `${scope}.profileShareQuickSharingOfTheLink`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s quick sharing of the link {contentLink} in {community}`,
  },
  communityShareQuickSharingOfTheLink: {
    id: `${scope}.communityShareQuickSharingOfTheLink`,
    defaultMessage: 'A quick sharing of the link was shared {contentLink}',
  },
  profileCopyQuickSharingOfTheLink: {
    id: `${scope}.profileCopyQuickSharingOfTheLink`,
    defaultMessage:
      '{sourceUser} has copied your quick sharing of the link {contentLink}',
  },
  communityCopyQuickSharingOfTheLink: {
    id: `${scope}.communityCopyQuickSharingOfTheLink`,
    defaultMessage: 'A quick sharing of the link was copied {contentLink}',
  },
  profileAskToRevalidateQuickSharingOfTheLink: {
    id: `${scope}.profileAskToRevalidateQuickSharingOfTheLink`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a quick sharing of the link in {community}',
  },
  communityAskToRevalidateQuickSharingOfTheLink: {
    id: `${scope}.communityAskToRevalidateQuickSharingOfTheLink`,
    defaultMessage:
      'A quick sharing of the link needs to be validated again {contentLink}',
  },
  like: {
    id: `${scope}.like`,
    defaultMessage: `{sourceUser} has liked {targetUser}'s {contentType} {contentLink}`,
  },
  profileComment: {
    id: `${scope}.profileComment`,
    defaultMessage: `{sourceUser} has commented on {targetUser}'s {contentType} {contentLink}`,
  },
  communityComment: {
    id: `${scope}.communityComment`,
    defaultMessage: `{sourceUser} has commented on {contentType} {contentLink}`,
  },
  likeComment: {
    id: `${scope}.likeComment`,
    defaultMessage: '{sourceUser} has liked your comment {comment}',
  },
  profileMentionedInComment: {
    id: `${scope}.profileMentionedInComment`,
    defaultMessage: `{sourceUser} has mentioned you in {targetUser}'s {contentType}`,
  },
  communityMentionedInComment: {
    id: `${scope}.communityMentionedInComment`,
    defaultMessage: `{sourceUser} has mentioned you in {contentType} {contentLink}`,
  },
  profileRequestedCommunity: {
    id: `${scope}.profileRequestedCommunity`,
    defaultMessage:
      '{sourceUser} has made a new community proposal {communityName}',
  },
  communityRequestedCommunity: {
    id: `${scope}.communityRequestedCommunity`,
    defaultMessage: 'New community request {communityName}',
  },
  profileFollowToCommunity: {
    id: `${scope}.profileFollowToCommunity`,
    defaultMessage: '{sourceUser} has subscribed {community}',
  },
  communityFollowToCommunity: {
    id: `${scope}.communityFollowToCommunity`,
    defaultMessage: 'New subscriber to the community {community}',
  },
  profileWriteContentOnProfile: {
    id: `${scope}.profileWriteContentOnProfile`,
    defaultMessage: '{sourceUser} wrote on your wall',
  },
  communityWriteContentOnProfile: {
    id: `${scope}.communityWriteContentOnProfile`,
    defaultMessage: 'New message published on your profile by {sourceUser}',
  },
  profileCreateDigest: {
    id: `${scope}.profileCreateDigest`,
    defaultMessage: '{sourceUser} has sent a digest titled {digestTitle}',
  },
  communityCreateDigest: {
    id: `${scope}.communityCreateDigest`,
    defaultMessage: 'New digest sent {digestTitle}',
  },
  profilePreviewDigest: {
    id: `${scope}.profilePreviewDigest`,
    defaultMessage:
      '{sourceUser} has sent a digest preview titled {digestTitle}',
  },
  communityPreviewDigest: {
    id: `${scope}.communityPreviewDigest`,
    defaultMessage: 'New digest preview sent {digestTitle}',
  },
  visit: {
    id: `${scope}.visit`,
    defaultMessage: '{sourceUser} has visited your profile',
  },
  profileParticipate: {
    id: `${scope}.profileParticipate`,
    defaultMessage:
      '{sourceUser} {remainUser} {verb} participated your event {contentLink}',
  },
  communityParticipate: {
    id: `${scope}.communityParticipate`,
    defaultMessage:
      'New {participant} to the event {contentLink} {sourceUser} {remainUser}',
  },
  profileCancel: {
    id: `${scope}.profileCancel`,
    defaultMessage:
      '{sourceUser} {remainUser} {verb} cancelled the participation in your event {contentLink}',
  },
  communityCancel: {
    id: `${scope}.communityCancel`,
    defaultMessage:
      '{sourceUser} {remainUser} {verb} cancelled the participation in the event {contentLink}',
  },
  mentionedInQuickpost: {
    id: `${scope}.mentionedInQuickpost`,
    defaultMessage: `{sourceUser} mentioned you in {targetUser}'s quickpost`,
  },
  likeTheUserPinnedPost: {
    id: `${scope}.likeTheUserPinnedPost`,
    defaultMessage: '{sourceUser} has liked your card {cardTitle}',
  },
  followToUser: {
    id: `${scope}.followToUser`,
    defaultMessage: '{sourceUser} followed you',
  },
  unfollowToUser: {
    id: `${scope}.unfollowToUser`,
    defaultMessage: '{sourceUser} unfollowed you',
  },
  changePassword: {
    id: `${scope}.changePassword`,
    defaultMessage: '{sourceUser} changed password',
  },
  suggestAHobby: {
    id: `${scope}.suggestAHobby`,
    defaultMessage: '{sourceUser} has suggested to create a hobby',
  },
  acceptToCreateAHobby: {
    id: `${scope}.acceptToCreateAHobby`,
    defaultMessage: '{sourceUser} has accepted to create a hobby',
  },
  profileAskToCreateFAQquestion: {
    id: `${scope}.profileAskToCreateFAQquestion`,
    defaultMessage:
      '{sourceUser} has asked to publish Question FAQ in {community}',
  },
  communityAskToCreateFAQquestion: {
    id: `${scope}.communityAskToCreateFAQquestion`,
    defaultMessage: 'A Question FAQ needs to be validated {contentLink}',
  },
  profileCreateFAQquestion: {
    id: `${scope}.profileCreateFAQquestion`,
    defaultMessage: '{sourceUser} has created a Question FAQ in {community}',
  },
  communityCreateFAQquestion: {
    id: `${scope}.communityCreateFAQquestion`,
    defaultMessage: 'New Question FAQ was created {contentLink}',
  },
  profileModifyFAQquestion: {
    id: `${scope}.profileModifyFAQquestion`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s Question FAQ in {community}`,
  },
  communityModifyFAQquestion: {
    id: `${scope}.communityModifyFAQquestion`,
    defaultMessage: `A Question FAQ was modified {contentLink}`,
  },
  profileArchiveFAQquestion: {
    id: `${scope}.profileArchiveFAQquestion`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s Question FAQ in {community}`,
  },
  communityArchiveFAQquestion: {
    id: `${scope}.communityArchiveFAQquestion`,
    defaultMessage: 'A Question FAQ was archived {contentLink}',
  },
  profileAcceptToCreateFAQquestion: {
    id: `${scope}.profileAcceptToCreateFAQquestion`,
    defaultMessage:
      '{sourceUser} has accepted to create Question FAQ in {community}',
  },
  communityAcceptToCreateFAQquestion: {
    id: `${scope}.communityAcceptToCreateFAQquestion`,
    defaultMessage: 'A Question FAQ was validated {contentLink}',
  },
  profileShareFAQquestion: {
    id: `${scope}.profileShareFAQquestion`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s Question FAQ {contentLink} in {community}`,
  },
  communityShareFAQquestion: {
    id: `${scope}.communityShareFAQquestion`,
    defaultMessage: 'A Question FAQ was shared {contentLink}',
  },
  profileCopyFAQquestion: {
    id: `${scope}.profileCopyFAQquestion`,
    defaultMessage: '{sourceUser} has copied your Question FAQ {contentLink}',
  },
  communityCopyFAQquestion: {
    id: `${scope}.communityCopyFAQquestion`,
    defaultMessage: 'A Question FAQ was copied {contentLink}',
  },
  profileAskToRevalidateFAQquestion: {
    id: `${scope}.profileAskToRevalidateFAQquestion`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a Question FAQ in {community}',
  },
  communityAskToRevalidateFAQquestion: {
    id: `${scope}.communityAskToRevalidateFAQquestion`,
    defaultMessage: 'A Question FAQ needs to be validated again {contentLink}',
  },
  profileAskToCreateWiki: {
    id: `${scope}.profileAskToCreateWiki`,
    defaultMessage: '{sourceUser} has asked to publish Wiki in {community}',
  },
  communityAskToCreateWiki: {
    id: `${scope}.communityAskToCreateWiki`,
    defaultMessage: 'A Wiki needs to be validated {contentLink}',
  },
  profileCreateWiki: {
    id: `${scope}.profileCreateWiki`,
    defaultMessage: '{sourceUser} has created a Wiki in {community}',
  },
  communityCreateWiki: {
    id: `${scope}.communityCreateWiki`,
    defaultMessage: 'New Wiki was created {contentLink}',
  },
  profileModifyWiki: {
    id: `${scope}.profileModifyWiki`,
    defaultMessage: `{sourceUser} has modified {targetUser}'s Wiki in {community}`,
  },
  communityModifyWiki: {
    id: `${scope}.communityModifyWiki`,
    defaultMessage: `A Wiki was modified {contentLink}`,
  },
  profileArchiveWiki: {
    id: `${scope}.profileArchiveWiki`,
    defaultMessage: `{sourceUser} has archived {targetUser}'s Wiki in {community}`,
  },
  communityArchiveWiki: {
    id: `${scope}.communityArchiveWiki`,
    defaultMessage: 'A Wiki was archived {contentLink}',
  },
  profileAcceptToCreateWiki: {
    id: `${scope}.profileAcceptToCreateWiki`,
    defaultMessage: '{sourceUser} has accepted to create Wiki in {community}',
  },
  communityAcceptToCreateWiki: {
    id: `${scope}.communityAcceptToCreateWiki`,
    defaultMessage: 'A Wiki was validated {contentLink}',
  },
  profileShareWiki: {
    id: `${scope}.profileShareWiki`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s Wiki {contentLink} in {community}`,
  },
  communityShareWiki: {
    id: `${scope}.communityShareWiki`,
    defaultMessage: 'A Wiki was shared {contentLink}',
  },
  profileCopyWiki: {
    id: `${scope}.profileCopyWiki`,
    defaultMessage: '{sourceUser} has copied your Wiki {contentLink}',
  },
  communityCopyWiki: {
    id: `${scope}.communityCopyWiki`,
    defaultMessage: 'A Wiki was copied {contentLink}',
  },
  profileAskToRevalidateWiki: {
    id: `${scope}.profileAskToRevalidateWiki`,
    defaultMessage:
      '{sourceUser} has asked to revalidate a Wiki in {community}',
  },
  communityAskToRevalidateWiki: {
    id: `${scope}.communityAskToRevalidateWiki`,
    defaultMessage: 'A Wiki needs to be validated again {contentLink}',
  },
  meetingPlanned: {
    id: `${scope}.meetingPlanned`,
    defaultMessage: 'The conference {meetingTitle} is planned on {startDate}',
  },
  likeTheMeetingEvent: {
    id: `${scope}.likeTheMeetingEvent`,
    defaultMessage: `{sourceUser} has liked {targetUser}'s conference {meetingTitle}`,
  },
  meetingStarting: {
    id: `${scope}.meetingStarting`,
    defaultMessage: 'The conference {meetingTitle} is about to start {joinUrl}',
  },
  meetingJoinText: {
    id: `${scope}.meetingJoinText`,
    defaultMessage: 'Join Conference',
  },
  bookedADesk: {
    id: `${scope}.bookedADesk`,
    defaultMessage: '{sourceUser} has booked a desk {desk} in {space}',
  },
  deskNumber: {
    id: `${scope}.deskNumber`,
    defaultMessage: 'Desk Number',
  },
  createShare: {
    id: `${scope}.createShare`,
    defaultMessage: `{sourceUser} has shared {targetUser}'s share {contentLink} in {community}`,
  },
});
