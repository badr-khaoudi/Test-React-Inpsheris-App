import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { Yammer } from 'components/Icons';
import useStyles from 'components/FeedTypesV8/useStyles';

const YammerLink = ({ yammerLink }) => {
  const classes = useStyles();
  return (
    <a href={yammerLink.url} target="_blank" rel="nofollow noopener noreferrer">
      <Paper
        className={classes.root}
        style={{ borderRadius: 5, padding: 20, height: '100%' }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <Yammer />
          </Grid>
          <Grid item xs zeroMinWidth>
            <LinesEllipsis text={yammerLink.fileTitle} maxLine={2} />
          </Grid>
        </Grid>
      </Paper>
    </a>
  );
};

YammerLink.propTypes = {
  yammerLink: PropTypes.object,
};

export default memo(YammerLink);
