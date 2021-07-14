/**
 *
 * CommunityModal
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Grid,
  Typography,
  Container,
  InputBase,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Search, Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Anchors from 'components/Anchors';
import {
  makeSelectConfig,
  makeSelectYammerIntegration,
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
import {
  getCommunityGroupList,
  getCommunityList,
  filterCommunityList,
} from './actions';
import { CommunitySearch } from './Wrapper';
import AllCommunitiesModal from './AllCommunitiesModal';
import CommunityModalItems from './CommunityModalItems';

const WhiteCheckbox = withStyles({
  root: {
    color: '#fff',
    '&$checked': {
      color: '#fff',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export function CommunityModal(props) {
  useInjectReducer({ key: 'community', reducer });
  useInjectSaga({ key: 'community', saga });

  const {
    dispatchCommunityGroupList,
    dispatchCommunityList,
    dispatchFilterCommunityList,
    communityList,
    communityGroupList,
    communityListLoading,
    communityGroupListLoading,
    communityListError,
    communityGroupListError,
    communityListPageByGroup,
    communityListPageOrderBy,
    yammerIntegration,
    history,
  } = props;

  const intl = useIntl();

  useEffect(() => {
    if (communityListPageOrderBy) {
      dispatchCommunityGroupList();
      dispatchCommunityList({
        gplusCommunity: 'All',
        orderBy: communityListPageOrderBy.value,
      });
    }
  }, [communityListPageOrderBy]);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState({ lively: true, yammer: true });

  const handleInputChange = e => {
    setQuery(e.target.value);
    setActiveAnchor('');
    dispatchFilterCommunityList({
      orderBy: communityListPageOrderBy.value,
      searchText: e.target.value,
      filter: category,
    });
  };

  const handleCheckboxChange = e => {
    setCategories({ ...categories, [e.target.name]: e.target.checked });
    setActiveAnchor('');
    let other;
    let filter;
    if (e.target.name === 'lively') other = 'yammer';
    else other = 'lively';
    if (
      (e.target.checked && categories[other]) ||
      (!e.target.checked && !categories[other])
    ) {
      filter = 'all';
    } else if (e.target.checked === true) filter = e.target.name;
    else filter = other;
    setCategory(filter);
    dispatchFilterCommunityList({
      orderBy: communityListPageOrderBy.value,
      searchText: query,
      filter,
    });
  };

  const [activeAnchor, setActiveAnchor] = useState('');

  return (
    <>
      <Helmet>
        <title>Communities</title>
        <meta name="description" content="Description of Communities" />
      </Helmet>
      {/* display: 'inline' */}
      <Modal open style={{ color: '#ffffff' }}>
        <div
          style={{ width: '100%', height: '100%', overflowY: 'auto' }}
          id="container-div"
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              position: 'relative',
            }}
          >
            <IconButton
              aria-label={intl.formatMessage(messages.close)}
              onClick={() => history.goBack()}
              data-testid="close"
              color="inherit"
              style={{ position: 'fixed' }}
            >
              <Close />
            </IconButton>
          </div>
          <Container fixed style={{ paddingTop: 50, paddingBottom: 50 }}>
            {communityList && (
              <Anchors
                communityList={communityList}
                activeAnchor={activeAnchor}
                setActiveAnchor={setActiveAnchor}
              />
            )}

            {(communityListError || communityGroupListError) && (
              <Button
                aria-label={intl.formatMessage(messages.retry)}
                onClick={() => {
                  dispatchCommunityGroupList();
                  dispatchCommunityList({
                    gplusCommunity: 'All',
                    orderBy: communityListPageOrderBy.value,
                  });
                }}
                data-testid="retry"
              >
                <FormattedMessage {...messages.retry} />
              </Button>
            )}
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="h5" color="inherit">
                  <FormattedMessage {...messages.favourites} />
                </Typography>
              </Grid>
            </Grid>
            {!_.isEmpty(communityList) &&
              !_.isEmpty(communityGroupList) &&
              communityListPageByGroup &&
              communityListPageByGroup.value &&
              _.map(communityGroupList, communityGroup =>
                AllCommunitiesModal(
                  communityGroup,
                  _.filter(
                    communityList,
                    community =>
                      community.group.uid === communityGroup.uid &&
                      community.isLikedCommunity === true,
                  ),
                ),
              )}

            {!_.isEmpty(communityList) &&
              communityListPageByGroup &&
              communityListPageByGroup.value === false &&
              CommunityModalItems(
                _.filter(
                  communityList,
                  community => community.isLikedCommunity === true,
                ),
              )}

            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="h5" color="inherit">
                  <FormattedMessage {...messages.communities} />
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={3}
              alignItems="center"
              style={{ marginBottom: 20 }}
            >
              <Grid item md={8}>
                <CommunitySearch>
                  <InputBase
                    inputProps={{
                      'aria-label': intl.formatMessage(messages.search),
                      'data-testid': 'query',
                    }}
                    placeholder={intl.formatMessage(messages.search)}
                    style={{ flex: 1 }}
                    onChange={handleInputChange}
                  />
                  <Button
                    aria-label={intl.formatMessage(messages.search)}
                    variant="contained"
                    size="large"
                    color="primary"
                    disableElevation
                    onClick={() =>
                      dispatchFilterCommunityList({
                        orderBy: communityListPageOrderBy.value,
                        searchText: query,
                        filter: category,
                      })
                    }
                    data-testid="search"
                  >
                    <Search />
                  </Button>
                </CommunitySearch>
              </Grid>
              {yammerIntegration && yammerIntegration.value && (
                <>
                  <Grid item md={2} data-testid="filterCategory">
                    <FormControlLabel
                      control={
                        <WhiteCheckbox
                          inputProps={{ 'aria-label': 'lively' }}
                          color="default"
                          checked={categories.lively}
                          name="lively"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Lively"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <FormControlLabel
                      control={
                        <WhiteCheckbox
                          inputProps={{ 'aria-label': 'yammer' }}
                          color="default"
                          checked={categories.yammer}
                          name="yammer"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Yammer"
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {(communityListLoading || communityGroupListLoading) && (
              <Grid container spacing={1} data-testid="loading">
                <Grid item>
                  <CircularProgress aria-busy="true" color="inherit" />
                </Grid>
                <Grid item>
                  <Typography variant="h4" color="inherit">
                    <FormattedMessage {...messages.loading} />
                  </Typography>
                </Grid>
              </Grid>
            )}

            {!_.isEmpty(communityList) &&
              !_.isEmpty(communityGroupList) &&
              communityListPageByGroup &&
              communityListPageByGroup.value &&
              _.map(communityGroupList, communityGroup =>
                AllCommunitiesModal(
                  communityGroup,
                  _.filter(
                    communityList,
                    community =>
                      community.group.uid === communityGroup.uid &&
                      community.isLikedCommunity === false,
                  ),
                  activeAnchor,
                ),
              )}

            {!_.isEmpty(communityList) &&
              communityListPageByGroup &&
              communityListPageByGroup.value === false &&
              CommunityModalItems(
                _.filter(
                  communityList,
                  community => community.isLikedCommunity === false,
                ),
                activeAnchor,
              )}
          </Container>
        </div>
      </Modal>
    </>
  );
}

CommunityModal.propTypes = {
  dispatchCommunityGroupList: PropTypes.func,
  dispatchCommunityList: PropTypes.func,
  dispatchFilterCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityGroupList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  communityGroupListLoading: PropTypes.bool,
  communityListError: PropTypes.string,
  communityGroupListError: PropTypes.string,
  communityListPageByGroup: PropTypes.object,
  communityListPageOrderBy: PropTypes.object,
  yammerIntegration: PropTypes.object,
  history: PropTypes.object,
  intl: PropTypes.object,
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
  yammerIntegration: makeSelectYammerIntegration(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityGroupList: () => dispatch(getCommunityGroupList()),
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchFilterCommunityList: options =>
      dispatch(filterCommunityList(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CommunityModal);
