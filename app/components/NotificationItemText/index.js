/**
 *
 * NotificationItemText
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { participant as getParticipant } from 'containers/NotificationSupplier/actions';
import { makeSelectParticipant } from 'containers/NotificationSupplier/selectors';
import { makeSelectViewNotificationByCommunity } from 'containers/AuthBase/selectors';
import messages from './messages';

const CommunityLink = ({ community }) => (
  <Link
    to={`/community/${encodeURIComponent(community.label)}/${community.uid}`}
  >
    {community.label}
  </Link>
);

CommunityLink.propTypes = { community: PropTypes.object };

const UserLink = ({ user }) => (
  <Link to={`/myprofile/${user.uid}/About`}>{user.displayName}</Link>
);

UserLink.propTypes = { user: PropTypes.object };

const ContentLink = ({ content }) => {
  const location = useLocation();
  const heading = _.find(content.blocks, { type: 'heading' });
  return (
    <Link
      to={{
        pathname: `/community/${encodeURIComponent(content.community.label)}/${
          content.community.uid
        }/${content.communityTab.uid}/${content.uid}/viewdetail/HP`,
        state: { background: location },
      }}
    >
      {heading.title}
    </Link>
  );
};

ContentLink.propTypes = { content: PropTypes.object };

function NotificationItemText({ notification }) {
  const intl = useIntl();
  const viewNotificationByCommunity = useSelector(
    makeSelectViewNotificationByCommunity(),
  );
  const scope = viewNotificationByCommunity.value ? 'community' : 'profile';
  const community = <CommunityLink community={notification.community} />;
  const sourceUser = <UserLink user={notification.sourceUser} />;
  const targetUser = <UserLink user={notification.targetUser} />;
  const contentType =
    notification.content &&
    intl.formatMessage(messages[notification.content.type]);
  const contentLink = <ContentLink content={notification.content} />;

  const dispatch = useDispatch();

  const participant = useSelector(makeSelectParticipant(notification.uid));

  useEffect(() => {
    if (notification.action === 'participate') {
      dispatch(
        getParticipant(notification.uid, {
          action: 'participate',
          date: notification.creationDate,
          eventId: notification.itemId,
        }),
      );
    }
    if (notification.action === 'cancel') {
      dispatch(
        getParticipant(notification.uid, {
          action: 'cancel',
          date: notification.creationDate,
          eventId: notification.itemId,
        }),
      );
    }
  }, []);

  if (notification.action === 'remind event happens') {
    return (
      <FormattedMessage
        {...messages.remindEventHappens}
        values={{ contentLink }}
      />
    );
  }
  if (notification.action === 'ask to create article') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'create article') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify article') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyArticle`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive article') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveArticle`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create article') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share article') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareArticle`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy article') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyArticle`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate article') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to create document') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateDocument`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'create document') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateDocument`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify document') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyDocument`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive document') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveDocument`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create document') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateDocument`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share document') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareDocument`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy document') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyDocument`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate document') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateDocument`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to create quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateQuickpost`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'create quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateQuickpost`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyQuickpost`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveQuickpost`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateQuickpost`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareQuickpost`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyQuickpost`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate quickpost') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateQuickpost`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to create event') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateEvent`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'create event') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateEvent`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify event') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyEvent`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive event') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveEvent`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create event') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateEvent`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share event') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareEvent`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy event') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyEvent`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate event') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateEvent`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'ask to create imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateImageGallery`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'create imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateImageGallery`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyImageGallery`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveImageGallery`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateImageGallery`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareImageGallery`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyImageGallery`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate imageGallery') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateImageGallery`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'ask to create grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateGrandArticle`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'create grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateGrandArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyGrandArticle`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveGrandArticle`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateGrandArticle`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareGrandArticle`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyGrandArticle`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate grandArticle') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateGrandArticle`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'ask to create quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateQuickSharingOfTheLink`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'create quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateQuickSharingOfTheLink`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyQuickSharingOfTheLink`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'archive quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveQuickSharingOfTheLink`]}
        values={{ sourceUser, targetUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'accept to create quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateQuickSharingOfTheLink`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'share quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareQuickSharingOfTheLink`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyQuickSharingOfTheLink`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate quickSharingOfTheLink') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateQuickSharingOfTheLink`]}
        values={{ sourceUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'like') {
    return (
      <FormattedMessage
        {...messages.like}
        values={{
          sourceUser,
          targetUser,
          contentType,
          contentLink,
        }}
      />
    );
  }
  if (notification.action === 'comment') {
    return (
      <FormattedMessage
        {...messages[`${scope}Comment`]}
        values={{
          sourceUser,
          targetUser,
          contentType,
          contentLink,
        }}
      />
    );
  }
  if (notification.action === 'like comment') {
    return (
      <FormattedMessage
        {...messages.likeComment}
        values={{
          sourceUser,
          comment: <b>{notification.comment.text}</b>,
        }}
      />
    );
  }
  if (notification.action === 'mentioned in comment') {
    return (
      <FormattedMessage
        {...messages[`${scope}MentionedInComment`]}
        values={{
          sourceUser,
          targetUser,
          contentType,
          contentLink,
        }}
      />
    );
  }
  if (notification.action === 'requested community') {
    return (
      <FormattedMessage
        {...messages[`${scope}RequestedCommunity`]}
        values={{
          sourceUser,
          communityName: <b>{}</b>,
        }}
      />
    );
  }
  if (
    notification.action === 'follow to community' ||
    notification.action === 'subscribe to community'
  ) {
    return (
      <FormattedMessage
        {...messages[`${scope}FollowToCommunity`]}
        values={{
          sourceUser,
          community,
        }}
      />
    );
  }
  if (notification.action === 'write content on profile') {
    return (
      <FormattedMessage
        {...messages[`${scope}WriteContentOnProfile`]}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'create digest') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateDigest`]}
        values={{
          sourceUser,
          digestTitle: <b>{notification.digest.title}</b>,
        }}
      />
    );
  }
  if (notification.action === 'preview digest') {
    return (
      <FormattedMessage
        {...messages[`${scope}PreviewDigest`]}
        values={{
          sourceUser,
          digestTitle: <b>{notification.digest.title}</b>,
        }}
      />
    );
  }
  if (notification.action === 'visit') {
    return (
      <FormattedMessage
        {...messages.visit}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'participate') {
    const totalParticipant = _.size(participant);
    return (
      <FormattedMessage
        {...messages[`${scope}Participate`]}
        values={{
          sourceUser,
          remainUser:
            totalParticipant > 1 ? `and ${totalParticipant} other users` : null,
          verb: totalParticipant > 1 ? 'have' : 'has',
          participant: totalParticipant > 1 ? 'participants' : 'participant',
          contentLink,
        }}
      />
    );
  }
  if (notification.action === 'cancel') {
    const totalParticipant = _.size(participant);
    return (
      <FormattedMessage
        {...messages[`${scope}Cancel`]}
        values={{
          sourceUser,
          remainUser:
            totalParticipant > 1 ? `and ${totalParticipant} other users` : null,
          verb: totalParticipant > 1 ? 'have' : 'has',
          contentLink,
        }}
      />
    );
  }
  if (notification.action === 'mentioned in quickpost') {
    return (
      <FormattedMessage
        {...messages.mentionedInQuickpost}
        values={{
          sourceUser,
          targetUser,
        }}
      />
    );
  }
  if (notification.action === 'like the user pinned post') {
    return (
      <FormattedMessage
        {...messages.likeTheUserPinnedPost}
        values={{
          sourceUser,
          cardTitle: <b>{notification.userPinnedPost.title}</b>,
        }}
      />
    );
  }
  if (notification.action === 'follow to user') {
    return (
      <FormattedMessage
        {...messages.followToUser}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'unfollow to user') {
    return (
      <FormattedMessage
        {...messages.unfollowToUser}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'change password') {
    return (
      <FormattedMessage
        {...messages.changePassword}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'suggest a hobby') {
    return (
      <FormattedMessage
        {...messages.suggestAHobby}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'accept to create a hobby') {
    return (
      <FormattedMessage
        {...messages.acceptToCreateAHobby}
        values={{
          sourceUser,
        }}
      />
    );
  }
  if (notification.action === 'ask to create FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateFAQquestion`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'create FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateFAQquestion`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyFAQquestion`]}
        values={{ sourceUser, targetUser, community }}
      />
    );
  }
  if (notification.action === 'archive FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveFAQquestion`]}
        values={{ sourceUser, targetUser, community }}
      />
    );
  }
  if (notification.action === 'accept to create FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateFAQquestion`]}
        values={{ sourceUser, community }}
      />
    );
  }
  if (notification.action === 'share FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareFAQquestion`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyFAQquestion`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate FAQquestion') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateFAQquestion`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to create wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToCreateWiki`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'create wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}CreateWiki`]}
        values={{ sourceUser, community, contentLink }}
      />
    );
  }
  if (notification.action === 'modify wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}ModifyWiki`]}
        values={{ sourceUser, targetUser, community }}
      />
    );
  }
  if (notification.action === 'archive wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}ArchiveWiki`]}
        values={{ sourceUser, targetUser, community }}
      />
    );
  }
  if (notification.action === 'accept to create wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}AcceptToCreateWiki`]}
        values={{ sourceUser, community }}
      />
    );
  }
  if (notification.action === 'share wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}ShareWiki`]}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  if (notification.action === 'copy wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}CopyWiki`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'ask to revalidate wiki') {
    return (
      <FormattedMessage
        {...messages[`${scope}AskToRevalidateWiki`]}
        values={{ sourceUser, contentLink }}
      />
    );
  }
  if (notification.action === 'meeting planned') {
    return (
      <FormattedMessage
        {...messages.meetingPlanned}
        values={{
          meetingTitle: <b>{notification.meeting.title}</b>,
          startDate: (
            <b>
              {moment(notification.meeting.startDate).format(
                'MMM DD, YYYY [at] HH:mm',
              )}
            </b>
          ),
        }}
      />
    );
  }
  if (notification.action === 'like the meeting event') {
    return (
      <FormattedMessage
        {...messages.likeTheMeetingEvent}
        values={{
          sourceUser,
          targetUser,
          meetingTitle: <b>{notification.meeting.title}</b>,
        }}
      />
    );
  }
  if (notification.action === 'meeting starting') {
    return (
      <FormattedMessage
        {...messages.meetingStarting}
        values={{
          meetingTitle: <b>{notification.meeting.title}</b>,
          joinUrl: (
            <span style={{ display: 'block', marginTop: 5, marginBottom: 5 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                href={notification.meeting.meetingJoinUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {intl.formatMessage(messages.meetingJoinText)}
              </Button>
            </span>
          ),
        }}
      />
    );
  }
  if (notification.action === 'booked a desk') {
    return (
      <FormattedMessage
        {...messages.bookedADesk}
        values={{
          sourceUser,
          desk: (
            <b>{`${intl.formatMessage(messages.deskNumber)}: ${
              notification.itemId
            }`}</b>
          ),
          space: <b>{notification.space.name}</b>,
        }}
      />
    );
  }
  if (notification.action === 'create share') {
    return (
      <FormattedMessage
        {...messages.createShare}
        values={{ sourceUser, targetUser, contentLink, community }}
      />
    );
  }
  return <span>This notification is not available in this version</span>;
}

NotificationItemText.propTypes = {
  notification: PropTypes.object,
  intl: PropTypes.object,
};

export default memo(NotificationItemText);
