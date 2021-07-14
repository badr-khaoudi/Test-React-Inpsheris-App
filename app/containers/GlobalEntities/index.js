/**
 *
 * GlobalEntities
 *
 */

// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import makeSelectGlobalEntities from './selectors';
import reducer from './reducer';
import saga from './saga';

export function GlobalEntities() {
  useInjectReducer({ key: 'globalEntities', reducer });
  useInjectSaga({ key: 'globalEntities', saga });

  return null;
}

// GlobalEntities.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
//   globalEntities: makeSelectGlobalEntities(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(GlobalEntities);
export default GlobalEntities;
