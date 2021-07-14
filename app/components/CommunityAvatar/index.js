/**
 *
 * CommunityAvatar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initials } from 'utils/helpers/avatarInitials';
import { CommunityLogo, FeedAvatar } from 'components/FeedP2V8/Wrapper';
import { makeSelectCommunity } from 'containers/GlobalEntities/selectors';

function CommunityAvatar({ communityUid, variant }) {
  const community = useSelector(makeSelectCommunity(communityUid));
  if (variant === 'Label') {
    return (
      <Link to={`/${encodeURIComponent(community.label)}/${communityUid}`}>
        {community.label}
      </Link>
    );
  }
  return (
    <Link to={`/${encodeURIComponent(community.label)}/${communityUid}`}>
      {community.headerLogoUrl ? (
        <CommunityLogo src={community.headerLogoUrl} />
      ) : (
        <FeedAvatar>{initials(community.label)}</FeedAvatar>
      )}
    </Link>
  );
}

CommunityAvatar.propTypes = {
  communityUid: PropTypes.string,
  variant: PropTypes.string,
};

export default memo(CommunityAvatar);
