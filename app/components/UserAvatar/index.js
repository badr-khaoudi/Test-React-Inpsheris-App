/**
 *
 * UserAvatar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Link from 'utils/helpers/Link';
import { initials } from 'utils/helpers/avatarInitials';
import { FeedAvatar } from 'components/FeedP2V8/Wrapper';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import MiniProfile from 'containers/MiniProfile';

function UserAvatar({ userUid, variant, size }) {
  const user = useSelector(makeSelectUser(userUid)) || {};
  if (variant === 'Avatar') {
    return (
      <Link to={`/myprofile/${userUid}/About`}>
        {
          <FeedAvatar src={user.headerLogoUrl}>
            {initials([user.firstName, user.lastName])}
          </FeedAvatar>
        }
      </Link>
    );
  }
  if (variant === 'DisplayName') {
    return (
      <MiniProfile user={userUid}>
        <Link
          color="textPrimary"
          to={`/myprofile/${userUid}/About`}
          variant={size === 'sm' ? 'body1' : 'h6'}
        >
          {`${user.firstName} ${user.lastName}`}
        </Link>
      </MiniProfile>
    );
  }
  return null;
}

UserAvatar.propTypes = {
  userUid: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
};

export default memo(UserAvatar);
