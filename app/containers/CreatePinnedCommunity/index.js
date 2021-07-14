/**
 *
 * CreatePinnedCommunity
 *
 */

import _ from 'lodash';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCreatePinnedCommunity,
  getCommunityList,
} from 'containers/AuthBase/actions';
import axios from 'axios';
import { PinnedCommunitySchema } from 'utils/validator/PinnedCommunity';
import { useSnackbar } from 'notistack';
import reducer from './reducer';
import saga from './saga';
import {
  getPinnedCommunity,
  resetPinnedCommunityCreation,
  updatePinnedCommunity,
} from './actions';
import {
  makeSelectIsPinnedDetailLoading,
  makeSelectPinnedCommunity,
  makeSelectIsUpdateInprogress,
  makeSelectIsUpdateSuccess,
  makeSelectIsUpdateError,
} from './selectors';
import {
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectConfig,
} from '../AuthBase/selectors';

export function CreatePinnedCommunity({ isOpen, pinnedCommunityId }) {
  useInjectReducer({ key: 'createPinnedCommunity', reducer });
  useInjectSaga({ key: 'createPinnedCommunity', saga });

  // pinned community data
  const [title, setTitle] = useState('');
  const [communityUid, setCommunityUid] = useState('');
  const [communityTabUid, setCommunityTabUid] = useState('');
  const [availableTabs, setAvailableTabs] = useState([]);

  const cancelTokenSource = useRef(null);
  const dispatch = useDispatch();
  const [isPrerequisiteLoaded, setIsPrerequisiteLoaded] = useState(false);

  const isCommunityListLoading = useSelector(makeSelectCommunityListLoading());
  const communityList = useSelector(makeSelectCommunityList());

  const isPinnedDetailLoading = useSelector(makeSelectIsPinnedDetailLoading());
  const pinnedCommunityDetail = useSelector(makeSelectPinnedCommunity());

  const isUpdating = useSelector(makeSelectIsUpdateInprogress());
  const updateError = useSelector(makeSelectIsUpdateError());
  const isUpdateSuccess = useSelector(makeSelectIsUpdateSuccess());

  const showLastThreeArticles = useSelector(
    makeSelectConfig('SHOW_LAST_3_ARTICLES_FOR_PIN_COMMUNITY_POST'),
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    // load prerequisite information
    // 1 pinned community detail
    // 2 community list
    () => {
      cancelTokenSource.current = axios.CancelToken.source();
      if (pinnedCommunityId) {
        dispatch(
          getPinnedCommunity({
            id: pinnedCommunityId,
            cancelToken: cancelTokenSource.current.token,
          }),
        );
      }
      dispatch(getCommunityList({ filter: 'lively', gplusCommunity: 'ALL' }));
      return () => {
        // clear pending request
        cancelTokenSource.current.cancel();
        dispatch(resetPinnedCommunityCreation());
      };
    },
    [],
  );

  useEffect(() => {
    let isRequestPending = isCommunityListLoading;
    if (!isRequestPending && pinnedCommunityId) {
      isRequestPending = isPinnedDetailLoading;
    }
    setIsPrerequisiteLoaded(!isRequestPending);
  }, [isCommunityListLoading, isPinnedDetailLoading]);

  useEffect(() => {
    if (isPrerequisiteLoaded) {
      if (pinnedCommunityDetail) {
        setTitle(pinnedCommunityDetail.title);
        setCommunityUid(pinnedCommunityDetail.community.uid);
        setCommunityTabUid(pinnedCommunityDetail.communityTab.uid);
      }
    }
  }, [isPrerequisiteLoaded]);

  useEffect(() => {
    if (communityList) {
      const selectedCommunity = _.find(communityList, {
        uid: pinnedCommunityDetail ? communityUid : null,
      });
      if (selectedCommunity) {
        setAvailableTabs(
          selectedCommunity.tabs.filter(tab => {
            const type = tab.tabType.toLowerCase();
            return (
              !tab.privated &&
              !tab.pinnedTab &&
              (type === 'collection' ||
                type === 'event' ||
                type === 'article' ||
                type === 'quickpost' ||
                type === 'imagegallery' ||
                type === 'document')
            );
          }),
        );
      } else {
        setAvailableTabs([]);
      }
    } else {
      setAvailableTabs([]);
    }
  }, [communityUid]);

  useEffect(() => {
    if (isUpdateSuccess) {
      const message = pinnedCommunityId
        ? 'Pinned community is updated successfully.'
        : 'A new pinned community is configured successfully';
      enqueueSnackbar(message, {
        variant: 'success',
      });
      handleDialogClose();
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (updateError !== '') {
      enqueueSnackbar(updateError, {
        variant: 'error',
      });
    }
  }, [updateError]);

  const handleCommunityChange = e => {
    setCommunityUid(e.target.value);
    setCommunityTabUid('');
  };

  const handleSubmit = () => {
    const payload = {
      title,
      communityUid,
      ...(!showLastThreeArticles.value && { communityTabUid }),
      id: pinnedCommunityId,
    };
    const validationResult = PinnedCommunitySchema.validate(payload, {
      context: {
        showLastThreeArticles: showLastThreeArticles.value,
      },
    });
    if (validationResult.error) {
      enqueueSnackbar(validationResult.error.message, {
        variant: 'error',
      });
    } else {
      dispatch(
        updatePinnedCommunity({
          payload,
          cancelToken: cancelTokenSource.current.token,
        }),
      );
    }
  };
  const handleDialogClose = () => {
    dispatch(closeCreatePinnedCommunity());
  };
  return (
    <div>
      <Helmet>
        <title>
          {pinnedCommunityId
            ? 'Update pinned community'
            : 'Create pinned community'}
        </title>
        <meta
          name="description"
          content="Manage pinned community shown in home page"
        />
      </Helmet>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={handleDialogClose}
        aria-labelledby="pinned-community-edit"
      >
        <DialogTitle>Create Pinned Community</DialogTitle>
        <DialogContent>
          <Grid container alignItems="flex-start" spacing={2}>
            {!isPrerequisiteLoaded && (
              <Grid xs={12} container item justify="center" alignItems="center">
                <CircularProgress />
              </Grid>
            )}
            {isPrerequisiteLoaded && (
              <>
                <Grid xs={12} item>
                  <TextField
                    autoFocus
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    label="Select community"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    value={communityUid}
                    onChange={handleCommunityChange}
                  >
                    <MenuItem disabled>Select community</MenuItem>
                    {communityList.map(comm => (
                      <MenuItem key={comm.uid} value={comm.uid}>
                        {comm.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {showLastThreeArticles && !showLastThreeArticles.value && (
                  <Grid xs={12} item>
                    <TextField
                      label="Select tab"
                      variant="outlined"
                      fullWidth
                      size="small"
                      select
                      disabled={communityUid === ''}
                      value={communityTabUid}
                      onChange={e => setCommunityTabUid(e.target.value)}
                    >
                      <MenuItem disabled>Select tab</MenuItem>
                      {availableTabs.map(tab => (
                        <MenuItem key={tab.uid} value={tab.uid}>
                          {tab.tabName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!isPrerequisiteLoaded || isUpdating}
            onClick={handleSubmit}
            color="primary"
            startIcon={isUpdating && <CircularProgress />}
          >
            OK
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
CreatePinnedCommunity.propTypes = {
  isOpen: PropTypes.bool,
  pinnedCommunityId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default memo(CreatePinnedCommunity);
