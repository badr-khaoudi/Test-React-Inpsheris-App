/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/**
 *
 * CarouselItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Typography,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Edit, Delete } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCarousel } from 'containers/CarouselManager/selectors';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { editCarousel } from 'containers/AuthBase/actions';
import { makeSelectDeleteCarouselLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { publishCarousel, deleteCarousel } from './actions';
// import messages from './messages';

export function CarouselItem(props) {
  useInjectReducer({ key: 'carouselItem', reducer });
  useInjectSaga({ key: 'carouselItem', saga });

  const confirm = useConfirm();

  const {
    carouselItem,
    dispatchPublishCarousel,
    dispatchDeleteCarousel,
    deleteCarouselLoading,
    dispatchEditCarousel,
    communityUid,
  } = props;

  const [display, setDisplay] = useState(carouselItem.display);
  const [sequenceNumber, setSequenceNumber] = useState(
    carouselItem.sequenceNumber,
  );

  const handlePublish = () => {
    dispatchPublishCarousel({
      display,
      level: carouselItem.level,
      sequenceNumber,
      uid: carouselItem.uid,
    });
  };

  const handleDelete = async () => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this carousel?',
      });
      dispatchDeleteCarousel({
        uid: carouselItem.uid,
      });
    } catch {
      return false;
    }
    return false;
  };

  return (
    <Paper square variant="outlined" style={{ padding: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Thumbnail
            thumbnail_url={
              carouselItem.imageLevel1
                ? carouselItem.imageLevel1.thumbGalleryUrl
                : carouselItem.imageLevel2
                ? carouselItem.imageLevel2.thumbGalleryUrl
                : carouselItem.thumbUrl
            }
          />
        </Grid>
        <Grid item xs={9}>
          <Grid container style={{ height: '100%' }} justify="space-between">
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs>
                  <Typography variant="h6">
                    <strong>Title:</strong> {carouselItem.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() =>
                      dispatchEditCarousel(communityUid, carouselItem.uid)
                    }
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    disabled={deleteCarouselLoading}
                    onClick={handleDelete}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography variant="body1" gutterBottom>
                <strong>Sub Title:</strong> {carouselItem.subTitle}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Type:</strong> {carouselItem.type}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={display !== 0}
                        onChange={e => setDisplay(e.target.checked ? 1 : 0)}
                      />
                    }
                    label="Pulished"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Sequence Number"
                    variant="outlined"
                    size="small"
                    value={sequenceNumber}
                    onChange={e => setSequenceNumber(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handlePublish}
                  >
                    Publish
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

CarouselItem.propTypes = {
  carouselItem: PropTypes.object,
  dispatchPublishCarousel: PropTypes.func,
  dispatchDeleteCarousel: PropTypes.func,
  deleteCarouselLoading: PropTypes.bool,
  dispatchEditCarousel: PropTypes.func,
  communityUid: PropTypes.string,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    carouselItem: makeSelectCarousel(props.uid),
    deleteCarouselLoading: makeSelectDeleteCarouselLoading(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchPublishCarousel: options => dispatch(publishCarousel(options)),
    dispatchDeleteCarousel: options => dispatch(deleteCarousel(options)),
    dispatchEditCarousel: (communityUid, options) =>
      dispatch(editCarousel(communityUid, options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CarouselItem);
