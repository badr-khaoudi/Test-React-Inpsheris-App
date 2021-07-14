import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeSelectSearch } from './selectors';
import YammerLink from './YammerLink';

const YammerLinks = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  return (
    <>
      <Grid container spacing={2} style={{ paddingTop: 20 }}>
        {_.map(search.yammerLinks, yammerLink => (
          <Grid item xs={4} key={yammerLink.fileUid}>
            <YammerLink yammerLink={yammerLink} />
          </Grid>
        ))}
      </Grid>
      {page * 18 <= search.totalYammerLinks && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => setPage(page + 1)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

YammerLinks.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(YammerLinks);
