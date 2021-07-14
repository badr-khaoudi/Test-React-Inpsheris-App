/* eslint-disable indent */
/**
 *
 * UsefulLinksPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LivelyMenuContentContainer, LivelyAlert } from '../../common';

import { getUsefulLinks } from './actions';

import {
  makeSelectUsefulLinks,
  makeSelectUsefulLinksLoading,
  makeSelectUsefulLinksError,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import LivelyMenuList from '../../components/LivelyMenuList';

function UsefulLinksPage({
  dispatch,
  usefulLinks,
  usefulLinksLoading,
  usefulLinksError,
  noTitle,
  maxHeight,
}) {
  useInjectReducer({ key: 'usefulLinks', reducer });
  useInjectSaga({ key: 'usefulLinks', saga });

  const getData = () => {
    dispatch(getUsefulLinks());
  };

  useEffect(() => {
    if (usefulLinks.length === 0) getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>UsefulLinksPage</title>
        <meta name="description" content="Description of UsefulLinksPage" />
      </Helmet>
      {!noTitle && (
        <Typography variant="h2" component="h2" gutterBottom>
          Useful Links
        </Typography>
      )}
      <LivelyMenuContentContainer
        loading={usefulLinksLoading || usefulLinks.length === 0 ? 1 : 0}
        className={maxHeight && 'maxHeight'}
      >
        {!usefulLinksLoading ? (
          usefulLinks.map(item => (
            <LivelyMenuList menuData={item} key={item.id} />
          ))
        ) : (
          <CircularProgress
            style={{ alignSelf: 'center', justifySelf: 'center' }}
            color="primary"
          />
        )}
        {usefulLinks.length === 0 &&
          !usefulLinksLoading &&
          !usefulLinksError.name && (
            <LivelyAlert severity="warning">
              <AlertTitle>Empty</AlertTitle>
              There are no items in this list.
            </LivelyAlert>
          )}

        {!usefulLinksLoading && usefulLinksError.name ? (
          <LivelyAlert
            severity="error"
            action={
              <Button
                variant="contained"
                color="primary"
                onClick={() => getData()}
              >
                Retry
              </Button>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {usefulLinksError.message}.<br />
          </LivelyAlert>
        ) : (
          ''
        )}
      </LivelyMenuContentContainer>
    </>
  );
}

UsefulLinksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  noTitle: PropTypes.bool,
  maxHeight: PropTypes.bool,
  usefulLinksLoading: PropTypes.bool.isRequired,
  usefulLinksError: PropTypes.object.isRequired,
  usefulLinks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usefulLinks: makeSelectUsefulLinks(),
  usefulLinksLoading: makeSelectUsefulLinksLoading(),
  usefulLinksError: makeSelectUsefulLinksError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UsefulLinksPage);
