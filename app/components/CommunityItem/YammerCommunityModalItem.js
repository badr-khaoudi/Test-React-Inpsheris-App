/**
 *
 * YammerCommunityModalItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Yammer } from 'components/Icons';
import { initials } from 'utils/helpers/avatarInitials';

import {
  CommunityItem,
  CommunityImage,
  CommunityAvatar,
  CommunityTitle,
  Logo,
} from './Wrapper';

const YammerCommunityModalItem = ({ community, active }) => (
  <a
    href={community.yammerWebUrl}
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <CommunityItem>
      {community.yammerHeaderImageUrl ? (
        <CommunityImage
          src={community.yammerHeaderImageUrl}
          alt={community.label}
          data-testid="yammerHeaderImageUrl"
        />
      ) : (
        <CommunityAvatar variant="square" data-testid="communityAvatar">
          {initials(community.label)}
        </CommunityAvatar>
      )}
      <CommunityTitle varient="subtitle1" className={active ? 'active' : null}>
        {community.label}
      </CommunityTitle>
      <Logo>
        <Yammer />
      </Logo>
    </CommunityItem>
  </a>
);

YammerCommunityModalItem.propTypes = {
  community: PropTypes.object,
  active: PropTypes.bool,
};

export default YammerCommunityModalItem;
