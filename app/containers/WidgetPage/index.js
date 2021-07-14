/**
 *
 * WidgetPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Container, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Widgets from 'components/Widgets/Loadable';
import reducer from './reducer';
import saga from './saga';

import { getWidget } from './actions';
import { makeSelectWidgetLoading } from './selectors';

export function WidgetPage({ match, dispatchGetWidget, widgetLoading }) {
  useInjectReducer({ key: 'widgetPage', reducer });
  useInjectSaga({ key: 'widgetPage', saga });

  const { uid } = match.params;

  useEffect(() => {
    dispatchGetWidget({ uid });
  }, []);

  return (
    <>
      <Helmet>
        <title>WidgetPage</title>
        <meta name="description" content="Description of WidgetPage" />
      </Helmet>
      <Container maxWidth="lg" style={{ paddingTop: 50 }}>
        <Grid container justify="center">
          <Grid item xs={4}>
            {widgetLoading ? (
              <Skeleton variant="rect" style={{ height: 350 }} />
            ) : (
              <Widgets uid={uid} />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

WidgetPage.propTypes = {
  dispatchGetWidget: PropTypes.func,
  match: PropTypes.object,
  widgetLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  widgetLoading: makeSelectWidgetLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetWidget: options => dispatch(getWidget(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WidgetPage);
