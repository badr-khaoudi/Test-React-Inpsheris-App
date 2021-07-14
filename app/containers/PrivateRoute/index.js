/**
 *
 * PrivateRoute
 *
 */

import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectSession,
  checkSessionSuccess,
  checkSessionLoading,
} from 'containers/AuthBase/selectors';
import reducer from 'containers/AuthBase/reducer';
import { checkSession } from 'containers/AuthBase/actions';
import SplashScreen from 'components/SplashScreen';
import saga from './saga';

export function PrivateRoute({
  dispatchCheckSession,
  session,
  sessionSuccess,
  sessionLoading,
  component: Component,
  ...rest
}) {
  useInjectReducer({ key: 'authBase', reducer });
  useInjectSaga({ key: 'privateRoute', saga });

  useEffect(() => {
    if (!sessionSuccess) {
      dispatchCheckSession();
    }
  }, [sessionSuccess]);

  if (sessionSuccess) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <SplashScreen />;
}

PrivateRoute.propTypes = {
  dispatchCheckSession: PropTypes.func,
  session: PropTypes.object,
  component: PropTypes.any,
  location: PropTypes.object,
  sessionSuccess: PropTypes.bool,
  sessionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  sessionSuccess: checkSessionSuccess(),
  sessionLoading: checkSessionLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCheckSession: () => dispatch(checkSession()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivateRoute);
