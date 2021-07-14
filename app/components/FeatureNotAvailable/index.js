/**
 *
 * FeatureNotAvailable
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function FeatureNotAvailable({ feature }) {
  return (
    <>
      <Alert severity="info">
        {`${feature} feature is not available in this version.`}
      </Alert>
    </>
  );
}

FeatureNotAvailable.propTypes = { feature: PropTypes.string };

export default memo(FeatureNotAvailable);
