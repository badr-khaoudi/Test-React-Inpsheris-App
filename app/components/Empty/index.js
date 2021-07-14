/**
 *
 * Empty
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Empty({ title, extra }) {
  return (
    <Grid container spacing={2} alignItems="center" direction="column">
      <Grid item>
        <ErrorOutline fontSize="large" />
      </Grid>
      <Grid item>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      {extra && <Grid item>{extra}</Grid>}
    </Grid>
  );
}

Empty.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.node,
};

export default memo(Empty);
