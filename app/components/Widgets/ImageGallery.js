/**
 *
 * ImageGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { openGallery } from 'containers/AuthBase/actions';

function ImageGallery({ imageGallery }) {
  const dispatch = useDispatch();
  return (
    <Grid container spacing={2}>
      {_.map(imageGallery, (image, index) => (
        <Grid key={`${image.uid}${index}`} item xs={6}>
          <Thumbnail
            thumbnail_url={image.thumbGalleryUrl}
            onClick={() => {
              dispatch(openGallery('image', index, imageGallery));
            }}
            style={{ cursor: 'pointer' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

ImageGallery.propTypes = {
  imageGallery: PropTypes.array,
};

export default memo(ImageGallery);
