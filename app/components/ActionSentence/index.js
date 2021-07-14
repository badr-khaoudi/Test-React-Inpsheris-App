/* eslint-disable no-nested-ternary */
/**
 *
 * ActionSentence
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Link from 'utils/helpers/Link';
import { Link as MaterialLink } from '@material-ui/core';
import _ from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import {
  makeSelectUser,
  makeSelectCommunity,
} from 'containers/GlobalEntities/selectors';
import messages from './messages';

const CommunityLink = community => (
  <Link
    color="secondary"
    to={`/community/${encodeURIComponent(community.label)}/${community.uid}`}
  >
    {community.label}
  </Link>
);

const YammerCommunityLink = community => (
  <MaterialLink color="secondary" href={community.yammerWebUrl} target="_blank">
    {community.label}
  </MaterialLink>
);

const AuthorLink = author => (
  <Link color="secondary" to={`/myprofile/${author.uid}/About`}>
    {`${author.firstName} ${author.lastName}`}
  </Link>
);

function ActionSentence(props) {
  const {
    type,
    previousAction,
    lastAction,
    authorUid,
    editionStatus,
    blocks,
    communityUid,
  } = props;
  const intl = useIntl();
  let action = lastAction;

  const author = useSelector(makeSelectUser(authorUid));
  const community = useSelector(makeSelectCommunity(communityUid));

  if (action === 'change status') {
    if (previousAction === 'change status') {
      action = 'create';
    } else {
      action = previousAction;
    }
  }

  if (editionStatus === 'Draft') {
    action = 'draft';
  }

  if (
    (action === 'edit' || action === 'create' || action === 'draft') &&
    type === 'jobOffer'
  ) {
    return (
      <FormattedMessage
        {...messages.jobOfferSentence}
        values={{
          community: CommunityLink(community),
        }}
      />
    );
  }
  if (action === 'draft') {
    return (
      <FormattedMessage
        {...messages.draft}
        values={{
          feedType: intl.formatMessage(messages[type]),
          in: community ? 'in' : null,
          community: community ? CommunityLink(community) : null,
        }}
      />
    );
  }
  if (action === 'edit' || action === 'create' || !action) {
    return (
      <FormattedMessage
        {...messages.publish}
        values={{
          feedType: intl.formatMessage(messages[type]),
          in: community ? 'in' : null,
          community: community
            ? type === 'yammer'
              ? YammerCommunityLink(community)
              : CommunityLink(community)
            : null,
        }}
      />
    );
  }

  if (action === 'share') {
    return (
      <FormattedMessage
        {...messages.share}
        values={{
          feedType: intl.formatMessage(
            messages[_.find(blocks, { type: 'reference' }).refType],
          ),
          community: CommunityLink(community),
        }}
      />
    );
  }

  if (action === 'comment' && type === 'share') {
    return (
      <FormattedMessage
        {...messages.share}
        values={{
          feedType: intl.formatMessage(
            messages[_.find(blocks, { type: 'reference' }).refType],
          ),
          community: CommunityLink(community),
        }}
      />
    );
  }

  if (action === 'comment' && type !== 'share') {
    return (
      <FormattedMessage
        {...messages.comment}
        values={{
          feedType: intl.formatMessage(messages[type]),
          author: AuthorLink(author),
          community: CommunityLink(community),
        }}
      />
    );
  }
  if (action === 'like') {
    action = 'has liked';
  }
  if (action === 'archive') {
    action = 'has archived';
  }
  return null;
}

ActionSentence.propTypes = {
  type: PropTypes.string,
  previousAction: PropTypes.string,
  lastAction: PropTypes.string,
  authorUid: PropTypes.string,
  editionStatus: PropTypes.string,
  blocks: PropTypes.array,
  communityUid: PropTypes.string,
  intl: PropTypes.object,
};

export default memo(ActionSentence);
