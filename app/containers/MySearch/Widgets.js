import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { List, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeSelectSearch, makeSelectSearchLoading } from './selectors';
import Widget from './Widget';

const Widgets = ({ page, setPage }) => {
  const search = useSelector(makeSelectSearch());
  const searchLoading = useSelector(makeSelectSearchLoading());
  return (
    <>
      <List>
        {_.map(search.widgets, widget => (
          <Widget widget={widget} key={widget.uid} />
        ))}
      </List>
      {searchLoading &&
        _.map(_.range(4), index => (
          <Skeleton
            key={index}
            variant="rect"
            height={75}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        ))}
      {page * 18 <= search.totalWidgets && (
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

Widgets.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(Widgets);
