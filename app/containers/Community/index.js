/* eslint-disable indent */
/**
 *
 * Community
 *
 */

import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Container,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import loadable from 'utils/loadable';
import {
  makeSelectConfig,
  makeSelectCurrentUser,
} from 'containers/AuthBase/selectors';
import {
  makeSelectCommunityList,
  makeSelectCommunityGroupList,
  makeSelectCommunityListLoading,
  makeSelectCommunityGroupListLoading,
  makeSelectCommunityListError,
  makeSelectCommunityGroupListError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getCommunityGroupList, getCommunityList } from './actions';
import CommunityItems from './CommunityItems';
import AllCommunities from './AllCommunities';
import Communities from './Communities';

const RequestCommunity = loadable(() => import('./RequestCommunity'));

export function Community(props) {
  useInjectReducer({ key: 'community', reducer });
  useInjectSaga({ key: 'community', saga });

  const {
    dispatchCommunityGroupList,
    dispatchCommunityList,
    communityList,
    communityGroupList,
    communityListLoading,
    communityGroupListLoading,
    communityListError,
    communityGroupListError,
    communityListPageByGroup,
    communityListPageOrderBy,
    requestOfCommunity,
    currentUser,
  } = props;

  const intl = useIntl();

  useEffect(() => {
    if (communityListPageOrderBy) {
      dispatchCommunityGroupList({ order: true });
      dispatchCommunityList({
        gplusCommunity: 'All',
        orderBy: communityListPageOrderBy.value,
      });
    }
  }, [communityListPageOrderBy]);

  const [selectedGroup, setSelectedGroup] = useState('all');

  const handleSelectChange = e => {
    setSelectedGroup(e.target.value);
  };

  const [requestCommunityOpen, setRequestCommunityOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Communities</title>
        <meta name="description" content="Description of Communities" />
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          style={{ marginBottom: 10, marginTop: 20 }}
        >
          <Grid item>
            <Typography variant="h4">
              <FormattedMessage {...messages.communities} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              inputProps={{
                'aria-label': intl.formatMessage(messages.selectGroup),
              }}
              SelectProps={{
                SelectDisplayProps: { 'data-testid': 'select' },
              }}
              select
              variant="outlined"
              size="small"
              fullWidth
              label={intl.formatMessage(messages.selectGroup)}
              value={selectedGroup}
              onChange={handleSelectChange}
            >
              <MenuItem value="all">
                <FormattedMessage {...messages.all} />
              </MenuItem>
              {communityGroupList &&
                _.map(communityGroupList, communityGroup => (
                  <MenuItem
                    key={communityGroup.uid}
                    value={communityGroup.uid}
                    data-testid={communityGroup.groupName}
                  >
                    {communityGroup.groupName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          {communityGroupListError && (
            <Grid item xs>
              <Button
                data-testid="groupListRetry"
                aria-label={intl.formatMessage(messages.retry)}
                onClick={() => dispatchCommunityGroupList()}
              >
                <FormattedMessage {...messages.retry} />
              </Button>
            </Grid>
          )}
          {requestOfCommunity.value &&
            currentUser.role !== 'GlobalCommunityManager' && (
              <Grid
                item
                style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
              >
                <Button
                  aria-label={intl.formatMessage(messages.requestCommunity)}
                  variant="outlined"
                  color="primary"
                  onClick={() => setRequestCommunityOpen(true)}
                >
                  <FormattedMessage {...messages.requestCommunity} />
                </Button>
              </Grid>
            )}
        </Grid>

        {communityListLoading || communityGroupListLoading ? (
          <Grid container spacing={1} data-testid="loading">
            <Grid item>
              <CircularProgress aria-busy="true" />
            </Grid>
            <Grid item>
              <Typography variant="h4">
                <FormattedMessage {...messages.loading} />
              </Typography>
            </Grid>
          </Grid>
        ) : (
          selectedGroup === 'all' && (
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="h5">
                  <FormattedMessage {...messages.all} />
                </Typography>
              </Grid>
            </Grid>
          )
        )}

        {communityListError && (
          <Button
            aria-label={intl.formatMessage(messages.retry)}
            onClick={() =>
              dispatchCommunityList({
                gplusCommunity: 'All',
                orderBy: communityListPageOrderBy.value,
              })
            }
            data-testid="listRetry"
          >
            <FormattedMessage {...messages.retry} />
          </Button>
        )}

        {selectedGroup === 'all' &&
          !_.isEmpty(communityList) &&
          !_.isEmpty(communityGroupList) &&
          communityListPageByGroup &&
          communityListPageByGroup.value &&
          _.map(communityGroupList, communityGroup =>
            AllCommunities(
              communityGroup,
              _.filter(
                communityList,
                community => community.group.uid === communityGroup.uid,
              ),
            ),
          )}

        {selectedGroup === 'all' &&
          !_.isEmpty(communityList) &&
          communityListPageByGroup &&
          communityListPageByGroup.value === false &&
          CommunityItems(communityList)}

        {selectedGroup !== 'all' &&
          !_.isEmpty(communityList) &&
          !_.isEmpty(communityGroupList) &&
          Communities(
            _.find(
              communityGroupList,
              communityGroup => communityGroup.uid === selectedGroup,
            ),
            _.filter(
              communityList,
              community => community.group.uid === selectedGroup,
            ),
          )}
      </Container>
      {requestCommunityOpen && (
        <RequestCommunity handleClose={() => setRequestCommunityOpen(false)} />
      )}
    </>
  );
}

Community.propTypes = {
  dispatchCommunityGroupList: PropTypes.func,
  dispatchCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityGroupList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  communityGroupListLoading: PropTypes.bool,
  communityListError: PropTypes.string,
  communityGroupListError: PropTypes.string,
  communityListPageByGroup: PropTypes.object,
  communityListPageOrderBy: PropTypes.object,
  intl: PropTypes.object,
  requestOfCommunity: PropTypes.object,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  communityList: makeSelectCommunityList(),
  communityGroupList: makeSelectCommunityGroupList(),
  communityListLoading: makeSelectCommunityListLoading(),
  communityGroupListLoading: makeSelectCommunityGroupListLoading(),
  communityListError: makeSelectCommunityListError(),
  communityGroupListError: makeSelectCommunityGroupListError(),
  communityListPageByGroup: makeSelectConfig('COMMUNITY_LIST_PAGE_BY_GROUP'),
  communityListPageOrderBy: makeSelectConfig('COMMUNITY_LIST_PAGE_ORDER_BY'),
  requestOfCommunity: makeSelectConfig('REQUEST_OF_COMMUNITY'),
  currentUser: makeSelectCurrentUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityGroupList: options =>
      dispatch(getCommunityGroupList(options)),
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Community);
