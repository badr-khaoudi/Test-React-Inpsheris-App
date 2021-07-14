import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import CommunityItem from 'components/CommunityItem';
import { makeSelectCommunities } from 'containers/GlobalEntities/selectors';
import { makeSelectSearch, makeSelectSearchLoading } from './selectors';

const Communities = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  const communities = useSelector(makeSelectCommunities(search.communities));
  const searchLoading = useSelector(makeSelectSearchLoading());
  return (
    <>
      <Grid container spacing={5} style={{ paddingTop: 20 }}>
        {_.map(communities, community => (
          <CommunityItem key={community.uid} community={community} />
        ))}
      </Grid>
      {searchLoading && (
        <Grid container spacing={5} style={{ paddingTop: 20 }}>
          {_.map(_.range(4), index => (
            <Grid item xs={4}>
              <Skeleton key={index} variant="rect" width="100%" height={200} />
            </Grid>
          ))}
        </Grid>
      )}
      {page * 18 <= search.totalCommunities && (
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

Communities.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(Communities);
