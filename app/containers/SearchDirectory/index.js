/**
 *
 * SearchDirectory
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  List,
  Avatar,
  ListItemIcon,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import { makeSelectSearchDirectory, makeSelectTotalMembers } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  searchDirectory as searchDirectoryAction,
  searchDirectoryMore,
  searchDirectoryFilter,
  addCoworker,
  addPartner,
} from './actions';
// import messages from './messages';

export function SearchDirectory(props) {
  useInjectReducer({ key: 'searchDirectory', reducer });
  useInjectSaga({ key: 'searchDirectory', saga });

  const {
    dispatchSearchDirectory,
    dispatchSearchDirectoryMore,
    searchDirectory,
    totalMembers,
    open,
    handleClose,
    dispatchSearchDirectoryFilter,
    addUserType,
    dispatchAddCoworker,
    dispatchAddPartner,
    userUid,
  } = props;

  const userDetail = useSelector(makeSelectUser(userUid));

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (addUserType === 'coworker') {
      setSelectedUsers(userDetail.coworkers || []);
    }
    if (addUserType === 'partner') {
      setSelectedUsers(userDetail.userPartners || []);
    }
  }, [userDetail]);

  const handleSelectedUsers = uid => {
    if (_.indexOf(selectedUsers, uid) > -1) {
      setSelectedUsers(_.without(selectedUsers, uid));
    } else {
      setSelectedUsers([...selectedUsers, uid]);
    }
  };

  useEffect(() => {
    dispatchSearchDirectory({
      isIncludeCurrentUser: false,
      itemsPerPage: 20,
      orderBy: 'alphabet',
      page: 1,
      searchText,
    });
    return () => {
      setSelectedUsers([]);
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      dispatchSearchDirectoryMore({
        isIncludeCurrentUser: false,
        itemsPerPage: 20,
        orderBy: 'alphabet',
        page,
        searchText,
      });
    }
  }, [page]);

  useEffectAfterMount(() => {
    dispatchSearchDirectoryFilter({
      isIncludeCurrentUser: false,
      itemsPerPage: 20,
      orderBy: 'alphabet',
      page: 1,
      searchText,
    });
  }, [searchText]);

  const handleOkay = () => {
    const payload = _.map(selectedUsers, user => ({ uid: user }));
    if (addUserType === 'coworker') {
      dispatchAddCoworker(payload);
    }
    if (addUserType === 'partner') {
      dispatchAddPartner(payload);
    }
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Select
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers id="dialogContent">
          <InfiniteScroll
            dataLength={_.size(searchDirectory)}
            next={() => setPage(page + 1)}
            hasMore={page * 20 < totalMembers}
            scrollableTarget="dialogContent"
          >
            <Grid container style={{ marginBottom: 10 }}>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                size="small"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </Grid>
            <List>
              {_.map(searchDirectory, user => (
                <ListItem
                  key={user.uid}
                  button
                  onClick={() => handleSelectedUsers(user.uid)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={_.indexOf(selectedUsers, user.uid) > -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemAvatar>
                    <Avatar src={user.headerLogoUrl}>
                      {initials(user.displayName)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.displayName} />
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} variant="outlined" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SearchDirectory.propTypes = {
  dispatchSearchDirectory: PropTypes.func,
  dispatchSearchDirectoryMore: PropTypes.func,
  searchDirectory: PropTypes.array,
  totalMembers: PropTypes.number,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  dispatchSearchDirectoryFilter: PropTypes.func,
  addUserType: PropTypes.string,
  dispatchAddCoworker: PropTypes.func,
  dispatchAddPartner: PropTypes.func,
  userUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  searchDirectory: makeSelectSearchDirectory(),
  totalMembers: makeSelectTotalMembers(),
  userUid: makeSelectUserUid(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSearchDirectory: options =>
      dispatch(searchDirectoryAction(options)),
    dispatchSearchDirectoryMore: options =>
      dispatch(searchDirectoryMore(options)),
    dispatchSearchDirectoryFilter: options =>
      dispatch(searchDirectoryFilter(options)),
    dispatchAddCoworker: options => dispatch(addCoworker(options)),
    dispatchAddPartner: options => dispatch(addPartner(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SearchDirectory);
