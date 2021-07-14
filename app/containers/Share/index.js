/* eslint-disable indent */
/**
 *
 * Share
 *
 */

import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { useSnackbar } from 'notistack';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  ListSubheader,
  ListItemText,
  TextField,
  Card,
  CardContent,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getCommunityList,
  filterCommunityList,
  closeShare,
} from 'containers/AuthBase/actions';
import {
  makeSelectCurrentUser,
  makeSelectPinCommunityPost,
  makeSelectLastThreeArticles,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectShareAction,
  makeSelectShareContent,
  makeSelectShareContentOnCommunityTab,
} from 'containers/AuthBase/selectors';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import UserAvatar from 'components/UserAvatar';
import CheckType from 'containers/Feed/checkType';
import ActionSentence from 'components/ActionSentence';
import { communityTabSelection } from 'utils/helpers/communityTabSelection';
import { CommunitySelect } from 'containers/QuickPost/Wrapper';
import SelectCommunity from 'components/SelectCommunity/Loadable';
import { makeSelectShareSuccess } from './selectors';
import { share, cleanShare } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function Share(props) {
  useInjectReducer({ key: 'share', reducer });
  useInjectSaga({ key: 'share', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    currentUser,
    pinCommunityPost,
    lastThreeArticles,
    communityList: allCommunities,
    communityListLoading,
    shareAction,
    shareContent,
    dispatchCommunityList,
    dispatchFilterCommunityList,
    shareContentOnCommunityTab,
    shareSuccess,
    dispatchShare,
    dispatchCloseShare,
    dispatchCleanShare,
  } = props;

  const userDetail = useMemo(
    () => shareContent.lastActivityUser || shareContent.author,
    [shareContent],
  );

  const contentUid = useMemo(() => shareContent.sourceId || shareContent.uid, [
    shareContent,
  ]);

  const [isPinnedTabAllowed, setIsPinnedTabAllowed] = useState(false);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    if (pinCommunityPost && lastThreeArticles) {
      setIsPinnedTabAllowed(pinCommunityPost.value && !lastThreeArticles.value);
    }
  }, [pinCommunityPost, lastThreeArticles]);

  useEffect(() => {
    if (currentUser && currentUser.role === 'GlobalCommunityManager') {
      setCommunityList(
        communityTabSelection(
          allCommunities,
          shareContent.type,
          isPinnedTabAllowed,
          shareAction,
        ),
      );
    } else {
      const allowedCommunities = _.map(
        currentUser.communityRoles,
        communityRole => communityRole.communityUid,
      );
      setCommunityList(
        _.filter(allCommunities, community =>
          _.includes(allowedCommunities, community.uid),
        ),
      );
    }
  }, [currentUser, allCommunities, shareContent]);

  const communityTabs = useMemo(
    () =>
      _.flatten(
        _.map(communityList, community =>
          _.map(community.tabs, ({ uid, tabName }) => ({
            uid,
            tabName,
          })),
        ),
      ),
    [communityList],
  );

  useEffect(() => {
    setSelectedCommunities(
      _.filter(selectedCommunities, community =>
        _.find(allCommunities, { uid: community }),
      ),
    );
  }, [allCommunities]);

  const [communitySelectOpen, setCommunitySelectOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState([]);

  const handleCommunitySelectOpen = () => {
    dispatchCommunityList({ filter: 'lively' });
    setCommunitySelectOpen(true);
  };

  const handleCommunitySelectClose = () => {
    setCommunitySelectOpen(false);
  };

  const handleFilterCommunities = searchText => {
    dispatchFilterCommunityList({
      filter: 'lively',
      searchText,
    });
  };

  const handleTabSelect = e => {
    setSelectedTabs(e.target.value);
  };

  const handleSelectCommunityChange = () => {
    setSelectedTabs(
      _.compact(
        _.flatten(
          _.map(
            _.filter(
              communityList,
              community => _.indexOf(selectedCommunities, community.uid) > -1,
            ),
            community => {
              if (_.size(community.tabs) === 1) {
                return _.head(community.tabs).uid;
              }
              return _.map(community.tabs, tab =>
                tab.defaultSelected ? tab.uid : null,
              );
            },
          ),
        ),
      ),
    );
    handleCommunitySelectClose();
  };

  const handleSelectedCommunities = e => {
    if (_.indexOf(selectedCommunities, e.target.value) > -1) {
      setSelectedCommunities(_.without(selectedCommunities, e.target.value));
    } else {
      setSelectedCommunities([...selectedCommunities, e.target.value]);
    }
  };

  const handleShare = () => {
    dispatchShare({
      communityUids: selectedCommunities,
      ctyTabUids: selectedTabs,
      contentUid,
      action: shareAction,
    });
  };

  useEffect(() => {
    if (shareSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCleanShare();
      dispatchCloseShare();
    }
  }, [shareSuccess]);

  const reference = _.find(shareContent.blocks, { type: 'reference' });

  useCloseEffect(dispatchCloseShare);

  return (
    <>
      <Dialog
        open={open}
        onClose={dispatchCloseShare}
        scroll="paper"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Share
          <IconButton
            aria-label="close"
            onClick={dispatchCloseShare}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Contenu partagé</Typography>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  {shareContent.type !== 'jobOffer' && (
                    <UserAvatar userUid={userDetail} variant="DisplayName" />
                  )}
                  <Typography variant="subtitle1" gutterBottom>
                    <ActionSentence
                      type={
                        shareContent.type === 'follower quickpost sharing' ||
                        shareContent.type === 'follower quickpost'
                          ? reference.refType
                          : shareContent.type
                      }
                      previousAction={shareContent.previousAction}
                      lastAction={shareContent.lastAction}
                      authorUid={shareContent.author}
                      editionStatus={shareContent.editionStatus}
                      blocks={shareContent.blocks}
                      communityUid={shareContent.community}
                    />
                  </Typography>
                  {CheckType(
                    shareContent.type,
                    shareContent.blocks,
                    shareContent.parseText,
                    shareContent.subTitle || null,
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Partager à une communauté</Typography>
            </Grid>
            <Grid item xs={12} onClick={handleCommunitySelectOpen}>
              <CommunitySelect>
                <Typography noWrap>
                  {_.size(selectedCommunities) === 0
                    ? 'Community name/Category name'
                    : _.map(
                        _.filter(communityList, community =>
                          _.includes(selectedCommunities, community.uid),
                        ),
                        community => community.label,
                      ).join(', ')}
                </Typography>
              </CommunitySelect>
            </Grid>
            {shareContentOnCommunityTab && shareContentOnCommunityTab.value && (
              <Grid item xs={12}>
                <TextField
                  label="Select community tab"
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  disabled={_.isEmpty(selectedCommunities)}
                  SelectProps={{
                    multiple: true,
                    value: selectedTabs,
                    renderValue: selected =>
                      _.map(selected, value =>
                        _.find(communityTabs, { uid: value })
                          ? _.find(communityTabs, { uid: value }).tabName
                          : undefined,
                      ).join(', '),
                    onChange: handleTabSelect,
                  }}
                >
                  {_.map(
                    _.filter(
                      communityList,
                      community =>
                        _.indexOf(selectedCommunities, community.uid) > -1,
                    ),
                    community => [
                      <ListSubheader>{community.label}</ListSubheader>,
                      _.map(community.tabs, tab => (
                        <MenuItem key={tab.uid} value={tab.uid} dense>
                          <Checkbox
                            checked={_.indexOf(selectedTabs, tab.uid) > -1}
                            color="primary"
                          />
                          <ListItemText primary={tab.tabName} />
                        </MenuItem>
                      )),
                    ],
                  )}
                </TextField>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShare} variant="outlined" color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
      {communitySelectOpen && (
        <SelectCommunity
          communitySelectOpen={communitySelectOpen}
          handleClose={handleCommunitySelectClose}
          communityListLoading={communityListLoading}
          communityList={communityList}
          selectedCommunities={selectedCommunities}
          handleSelectedCommunities={handleSelectedCommunities}
          handleFilterCommunities={handleFilterCommunities}
          handleSelectCommunityChange={handleSelectCommunityChange}
        />
      )}
    </>
  );
}

Share.propTypes = {
  open: PropTypes.bool,
  currentUser: PropTypes.object,
  pinCommunityPost: PropTypes.object,
  lastThreeArticles: PropTypes.object,
  dispatchCommunityList: PropTypes.func,
  dispatchFilterCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  shareAction: PropTypes.string,
  shareContent: PropTypes.object,
  shareContentOnCommunityTab: PropTypes.object,
  shareSuccess: PropTypes.bool,
  dispatchShare: PropTypes.func,
  dispatchCloseShare: PropTypes.func,
  dispatchCleanShare: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  pinCommunityPost: makeSelectPinCommunityPost(),
  lastThreeArticles: makeSelectLastThreeArticles(),
  communityList: makeSelectCommunityList(),
  communityListLoading: makeSelectCommunityListLoading(),
  shareAction: makeSelectShareAction(),
  shareContent: makeSelectShareContent(),
  shareContentOnCommunityTab: makeSelectShareContentOnCommunityTab(),
  shareSuccess: makeSelectShareSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchFilterCommunityList: options =>
      dispatch(filterCommunityList(options)),
    dispatchShare: options => dispatch(share(options)),
    dispatchCloseShare: () => dispatch(closeShare()),
    dispatchCleanShare: () => dispatch(cleanShare()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Share);
