/**
 *
 * PinnedPosts
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import { AddCircleOutline } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { UploadGrid } from 'containers/QuickPost/Wrapper';
import CreatePin from 'containers/CreatePin/Loadable';
import makeSelectPinnedPosts from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function PinnedPosts(props) {
  useInjectReducer({ key: 'pinnedPosts', reducer });
  useInjectSaga({ key: 'pinnedPosts', saga });

  // eslint-disable-next-line no-unused-vars
  const { userUid } = props;

  const [createPinOpen, setCreatePinOpen] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <UploadGrid>
            <ButtonBase
              style={{
                width: '100%',
                height: '100%',
              }}
              onClick={() => setCreatePinOpen(true)}
            >
              <Grid container direction="column" alignItems="center">
                <AddCircleOutline />
                Add a new pin
              </Grid>
            </ButtonBase>
          </UploadGrid>
        </Grid>
      </Grid>
      {createPinOpen && (
        <CreatePin
          open={createPinOpen}
          handleClose={() => setCreatePinOpen(false)}
        />
      )}
    </>
  );
}

PinnedPosts.propTypes = {
  userUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  pinnedPosts: makeSelectPinnedPosts(),
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

export default compose(
  withConnect,
  memo,
)(PinnedPosts);
