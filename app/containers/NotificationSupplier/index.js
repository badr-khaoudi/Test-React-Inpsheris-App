/**
 *
 * NotificationSupplier
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

function NotificationSupplier() {
  useInjectReducer({ key: 'notificationSupplier', reducer });
  useInjectSaga({ key: 'notificationSupplier', saga });

  return <></>;
}

NotificationSupplier.propTypes = {};

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(NotificationSupplier);
