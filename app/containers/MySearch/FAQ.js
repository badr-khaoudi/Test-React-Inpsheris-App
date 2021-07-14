import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid, List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Feed from 'containers/FeedV8';
import FeedSkeleton from 'components/FeedTypesV8/FeedSkeleton';
import { makeSelectSearch, makeSelectSearchLoading } from './selectors';

const FAQ = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  const searchLoading = useSelector(makeSelectSearchLoading());
  return (
    <>
      <List>
        {_.map(search.contents, content => (
          <Feed contentUid={content} key={content} referrer="HP" />
        ))}
      </List>
      {searchLoading &&
        _.map(_.range(4), index => <FeedSkeleton key={index} />)}
      {page * 18 <= search.totalContents && (
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

FAQ.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(FAQ);
