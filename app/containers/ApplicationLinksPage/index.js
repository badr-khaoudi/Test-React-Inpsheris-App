/* eslint-disable indent */
/**
 *
 * LivelyMobileApplicationLinksPage
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

import Button from '@material-ui/core/Button';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  makeSelectApplicationLinks,
  makeSelectApplicationLinksLoading,
  makeSelectApplicationLinksError,
} from './selectors';
import { getApplicationLinks } from './actions';

import reducer from './reducer';
import saga from './saga';

import { LivelyMenuContentContainer, LivelyAlert } from '../../common';
import LivelyMenuList from '../../components/LivelyMenuList';

function LivelyMobileApplicationLinksPage({
  dispatch,
  applicationLinks,
  applicationLinksLoading,
  applicationLinksError,
  noTitle,
  maxHeight,
}) {
  useInjectReducer({ key: 'applicationLinks', reducer });
  useInjectSaga({ key: 'applicationLinks', saga });

  const getData = () => {
    dispatch(getApplicationLinks());
  };

  useEffect(() => {
    if (applicationLinks.length === 0) getData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Application Links</title>
        <meta
          name="description"
          content="Description of LivelyMobileApplicationLinksPage"
        />
      </Helmet>
      {!noTitle && (
        <Typography variant="h2" component="h2" gutterBottom>
          Application Links
        </Typography>
      )}

      <LivelyMenuContentContainer
        loading={
          applicationLinksLoading || applicationLinks.length === 0 ? 1 : 0
        }
        className={maxHeight && 'maxHeight'}
      >
        {!applicationLinksLoading ? (
          applicationLinks.map(item => (
            <LivelyMenuList menuData={item} key={item.id} />
          ))
        ) : (
          <CircularProgress
            style={{ alignSelf: 'center', justifySelf: 'center' }}
            color="primary"
          />
        )}

        {applicationLinks.length === 0 &&
          !applicationLinksLoading &&
          !applicationLinksError.name && (
            <LivelyAlert severity="warning">
              <AlertTitle>Empty</AlertTitle>
              There are no items in this list.
            </LivelyAlert>
          )}

        {!applicationLinksLoading && applicationLinksError.name && (
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
            {applicationLinksError.message}.<br />
          </LivelyAlert>
        )}
      </LivelyMenuContentContainer>
    </>
  );
}

LivelyMobileApplicationLinksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  noTitle: PropTypes.bool,
  maxHeight: PropTypes.bool,
  applicationLinksLoading: PropTypes.bool.isRequired,
  applicationLinksError: PropTypes.object.isRequired,
  applicationLinks: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationLinks: makeSelectApplicationLinks(),
  applicationLinksLoading: makeSelectApplicationLinksLoading(),
  applicationLinksError: makeSelectApplicationLinksError(),
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

export default compose(withConnect)(LivelyMobileApplicationLinksPage);
