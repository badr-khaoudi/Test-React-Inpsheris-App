/**
 *
 * UserLiked
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { initials } from 'utils/helpers/avatarInitials';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Avatar,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import { makeSelectUserLikedOption } from 'containers/AuthBase/selectors';
import { closeUserLiked } from 'containers/AuthBase/actions';
import { makeSelectUserLiked } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { userLiked } from './actions';

export function UserLiked(props) {
  useInjectReducer({ key: 'userLiked', reducer });
  useInjectSaga({ key: 'userLiked', saga });

  const {
    userLikedOption,
    dispatchUserLiked,
    userList,
    dispatchCloseUserLiked,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchUserLiked({ ...userLikedOption, itemsPerPage: 50, page });
  }, [userLikedOption]);

  useCloseEffect(dispatchCloseUserLiked);

  return (
    <Dialog
      open
      onClose={dispatchCloseUserLiked}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Membre(s) ayant liké
        <IconButton
          aria-label="close"
          onClick={dispatchCloseUserLiked}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {_.map(userList, user => (
            <Grid item xs={4} key={user.author.uid}>
              <Link
                to={`/myprofile/${user.author.uid}/About`}
                onClick={dispatchCloseUserLiked}
              >
                <Grid container direction="column" alignItems="center">
                  <Avatar
                    style={{ height: 100, width: 100 }}
                    src={user.author.headerLogoUrl}
                  >
                    {initials(user.author.displayName)}
                  </Avatar>
                  <Typography>{user.author.displayName}</Typography>
                </Grid>
              </Link>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

UserLiked.propTypes = {
  userLikedOption: PropTypes.object,
  dispatchUserLiked: PropTypes.func,
  userList: PropTypes.array,
  dispatchCloseUserLiked: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userLikedOption: makeSelectUserLikedOption(),
  userList: makeSelectUserLiked(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUserLiked: options => dispatch(userLiked(options)),
    dispatchCloseUserLiked: () => dispatch(closeUserLiked()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserLiked);
