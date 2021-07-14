import React from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function ProtectedRoute(props) {
  const Component = props.component;
  const shouldShow = props.hasAccess;

  return shouldShow ? <Component /> : <Redirect to={{ pathname: '/' }} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  hasAccess: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
