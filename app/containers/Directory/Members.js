/* eslint-disable indent */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';
import { Container, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import Member from 'components/Member';
import {
  makeSelectMembers,
  makeSelectDirectory,
  makeSelectDirectoryLoading,
} from './selectors';
import { MemberGrid } from './Wrapper';

const Members = ({ page, setPage, isRandom }) => {
  const members = useSelector(makeSelectMembers());
  const directory = useSelector(makeSelectDirectory());
  const directoryLoading = useSelector(makeSelectDirectoryLoading());

  return (
    <Container maxWidth="lg" style={{ paddingTop: 20 }}>
      <Typography variant="h5" gutterBottom>
        {isRandom
          ? '4 random members'
          : `Total result(s): ${
              directory.totalMembers === 0 ? 0 : directory.totalMembers || ''
            }`}
      </Typography>
      <Grid container spacing={2}>
        {_.map(members, member => (
          <MemberGrid item xs={12} sm={6} md={3} key={member}>
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
              <Member uid={member} />
            </LazyLoad>
          </MemberGrid>
        ))}
        {directoryLoading &&
          _.map(_.range(4), index => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton
                variant="rect"
                style={{ minHeight: 400, height: '100%' }}
              />
            </Grid>
          ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          {page * 18 <= directory.totalMembers && (
            <Button
              onClick={() => setPage(page + 1)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

Members.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  isRandom: PropTypes.bool,
};

export default memo(Members);
