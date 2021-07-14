import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import LazyLoad from 'react-lazyload';
import Member from 'components/Member';
import { makeSelectSearch, makeSelectSearchLoading } from './selectors';

const Members = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  const searchLoading = useSelector(makeSelectSearchLoading());
  return (
    <>
      <Grid container spacing={2} style={{ paddingTop: 20 }}>
        {_.map(search.members, member => (
          <Grid item xs={12} sm={6} md={3} key={member}>
            <LazyLoad
              offset={200}
              placeholder={
                <Skeleton
                  variant="rect"
                  style={{ minHeight: 400, height: '100%' }}
                />
              }
              debounce
              once
              height="100%"
            >
              <Member uid={member} setFollowedUser={() => {}} />
            </LazyLoad>
          </Grid>
        ))}
        {searchLoading &&
          _.map(_.range(4), index => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton
                variant="rect"
                style={{ minHeight: 400, height: '100%' }}
              />
            </Grid>
          ))}
      </Grid>
      {page * 18 <= search.totalMembers && (
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

Members.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(Members);
