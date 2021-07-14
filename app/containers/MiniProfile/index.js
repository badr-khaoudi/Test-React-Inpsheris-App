/**
 *
 * MiniProfile
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import { Tooltip, Grid, Avatar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import { makeSelectProfileTooltip } from 'containers/AuthBase/selectors';
import {
  makeSelectUserProfileLoading,
  makeSelectUserProfileSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { userProfile as userProfileAction } from './actions';

const ProfileTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
    minWidth: 300,
  },
}))(Tooltip);

export function MiniProfile(props) {
  useInjectReducer({ key: 'miniProfile', reducer });
  useInjectSaga({ key: 'miniProfile', saga });

  const {
    user,
    children,
    dispatchUserProfile,
    userProfile,
    userProfileLoading,
    profileTooltip,
  } = props;

  const cancelToken = useRef();

  const [open, setOpen] = useState(false);

  useEffectAfterMount(() => {
    if (open) {
      cancelToken.current = axios.CancelToken.source();
      dispatchUserProfile({ uid: user }, cancelToken.current.token);
    }
    if (!open) {
      cancelToken.current.cancel('handleClose Cancel');
    }
  }, [open]);

  if (profileTooltip.value) {
    return (
      <ProfileTooltip
        interactive
        placement="top"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        enterNextDelay={300}
        title={
          <div onClick={e => e.stopPropagation()} aria-hidden="true">
            {userProfileLoading ? (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Skeleton variant="circle" height={40} width={40} />
                </Grid>
                <Grid item xs={10}>
                  <Skeleton variant="text" height={40} width={200} />
                  <Skeleton variant="text" height={40} width={200} />
                  <Skeleton variant="text" height={40} width={200} />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Avatar src={userProfile.headerLogoUrl}>
                    {initials(userProfile.displayName)}
                  </Avatar>
                </Grid>
                <Grid item xs={10}>
                  <Link to={`/myprofile/${user}/About`}>
                    <Typography variant="h6" gutterBottom>
                      {userProfile.displayName}
                    </Typography>
                  </Link>
                  <Typography>{userProfile.office}</Typography>
                  <Typography>{userProfile.positionName}</Typography>
                  <Typography>{userProfile.service}</Typography>
                  <Typography>{userProfile.telephone}</Typography>
                  <Typography>{userProfile.email}</Typography>
                </Grid>
              </Grid>
            )}
          </div>
        }
      >
        {children}
      </ProfileTooltip>
    );
  }

  if (!profileTooltip.value) {
    return <>{children}</>;
  }
}

MiniProfile.propTypes = {
  user: PropTypes.string,
  children: PropTypes.node,
  dispatchUserProfile: PropTypes.func,
  userProfile: PropTypes.object,
  userProfileLoading: PropTypes.bool,
  profileTooltip: PropTypes.object,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    userProfile: makeSelectUser(props.user),
    userProfileLoading: makeSelectUserProfileLoading(),
    userProfileSuccess: makeSelectUserProfileSuccess(),
    profileTooltip: makeSelectProfileTooltip(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchUserProfile: (options, cancelToken) =>
      dispatch(userProfileAction(options, cancelToken)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MiniProfile);
