/**
 *
 * LivelyCommunityModalItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as Star } from '../../images/Star.svg';
import { initials } from '../../utils/helpers/avatarInitials';

import {
  CommunityItem,
  CommunityImage,
  CommunityAvatar,
  CommunityTitle,
  Logo,
} from './Wrapper';

const LivelyCommunityModalItem = ({ community, active }) => (
  <Link
    to={`/community/${encodeURIComponent(community.label)}/${community.uid}`}
  >
    <CommunityItem>
      {community.headerLogoUrl ? (
        <CommunityImage
          src={community.headerLogoUrl}
          alt={community.label}
          data-testid="headerLogoUrl"
        />
      ) : (
        <CommunityAvatar variant="square" data-testid="communityAvatar">
          {initials(community.label)}
        </CommunityAvatar>
      )}
      <CommunityTitle varient="subtitle1" className={active ? 'active' : null}>
        {community.label}
      </CommunityTitle>
      {community.isLikedCommunity && (
        <Logo>
          <Star data-testid="isLikedCommunity" aria-hidden="true" />
        </Logo>
      )}
    </CommunityItem>
  </Link>
);

LivelyCommunityModalItem.propTypes = {
  community: PropTypes.object,
  active: PropTypes.bool,
};

export default LivelyCommunityModalItem;
