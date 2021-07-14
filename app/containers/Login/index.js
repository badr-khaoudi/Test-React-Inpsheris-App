/**
 *
 * Login
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { currentUser } from './actions';

export function Login({ dispatchCurrentUser }) {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  useEffect(() => {
    dispatchCurrentUser();
  }, []);

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
    </>
  );
}

Login.propTypes = {
  dispatchCurrentUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCurrentUser: () => dispatch(currentUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Login);
