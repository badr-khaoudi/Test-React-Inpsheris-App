/**
 *
 * CarouselManager
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Close, Add } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import {
  closeCarouselManager,
  createCarousel,
} from 'containers/AuthBase/actions';
import CarouselItem from 'containers/CarouselItem/Loadable';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import {
  makeSelectCarouselList,
  makeSelectCarouselListLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  carouselList as carouselListAction,
  carouselListMore,
} from './actions';
// import messages from './messages';

export function CarouselManager(props) {
  useInjectReducer({ key: 'carouselManager', reducer });
  useInjectSaga({ key: 'carouselManager', saga });

  const [level, setLevel] = useState(1);
  const [page, setPage] = useState(1);

  const {
    dispatchCloseCarouselManager,
    dispatchCarouselList,
    carouselList,
    dispatchCarouselListMore,
    carouselListLoading,
    dispatchCreateCarousel,
    communityUid,
  } = props;

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    }
    dispatchCarouselList({
      communityUid,
      isAdmin: false,
      itemsPerPage: 10,
      level,
      page: 1,
    });
  }, [level]);

  useEffect(() => {
    if (page > 1) {
      dispatchCarouselListMore({
        communityUid,
        isAdmin: false,
        itemsPerPage: 10,
        level,
        page,
      });
    }
  }, [page]);

  useCloseEffect(dispatchCloseCarouselManager);

  return (
    <>
      <Helmet>
        <title>CarouselManager</title>
        <meta name="description" content="Description of CarouselManager" />
      </Helmet>
      <Dialog
        open
        onClose={dispatchCloseCarouselManager}
        scroll="paper"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          Carousel Manager
          <IconButton
            aria-label="close"
            onClick={dispatchCloseCarouselManager}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Paper square elevation={1} style={{ marginBottom: 16 }}>
            <Grid container>
              <Grid item xs>
                <Tabs value={level} onChange={(e, val) => setLevel(val)}>
                  <Tab label="Carousel Level 1" value={1} />
                  <Tab label="Carousel Level 2" value={2} />
                </Tabs>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => dispatchCreateCarousel(communityUid, level)}
                >
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2}>
            {_.map(carouselList, carousel => (
              <Grid item xs={12} key={carousel}>
                <CarouselItem uid={carousel} communityUid={communityUid} />
              </Grid>
            ))}
            {carouselListLoading &&
              _.map(_.range(3), index => (
                <Grid item xs={12} key={index}>
                  <div style={{ padding: 8 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Thumbnail>
                          <Skeleton
                            variant="rect"
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          />
                        </Thumbnail>
                      </Grid>
                      <Grid item xs={9}>
                        <Typography component="div" variant="h6">
                          <Skeleton />
                        </Typography>
                        <Typography component="div" variant="body1">
                          <Skeleton />
                        </Typography>
                        <Typography component="div" variant="body1">
                          <Skeleton />
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              ))}
            {page * 10 === _.size(carouselList) && (
              <Grid item>
                <Button
                  onClick={() => setPage(page + 1)}
                  variant="outlined"
                  color="primary"
                >
                  View More
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

CarouselManager.propTypes = {
  dispatchCloseCarouselManager: PropTypes.func,
  dispatchCarouselList: PropTypes.func,
  carouselList: PropTypes.array,
  dispatchCarouselListMore: PropTypes.func,
  carouselListLoading: PropTypes.bool,
  dispatchCreateCarousel: PropTypes.func,
  communityUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  carouselList: makeSelectCarouselList(),
  carouselListLoading: makeSelectCarouselListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseCarouselManager: () => dispatch(closeCarouselManager()),
    dispatchCarouselList: options => dispatch(carouselListAction(options)),
    dispatchCarouselListMore: options => dispatch(carouselListMore(options)),
    dispatchCreateCarousel: (communityUid, options) =>
      dispatch(createCarousel(communityUid, options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CarouselManager);
