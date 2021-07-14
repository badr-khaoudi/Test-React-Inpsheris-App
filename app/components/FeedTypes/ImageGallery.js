/**
 *
 * ImageGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box, Avatar } from '@material-ui/core';
import { SaveAlt, Image } from '@material-ui/icons';
import { createMarkup } from 'utils/helpers/createMarkup';
import { openGallery } from 'containers/AuthBase/actions';
import { Thumbnail, SingleImage, Save } from './Wrapper';
import ListMore from './ListMore';

function ImageGallery({ images, parseText, isFeedModal }) {
  const dispatch = useDispatch();
  return (
    <>
      {!isFeedModal && parseText && (
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={createMarkup(parseText)}
        />
      )}
      {isFeedModal && _.size(images) === 1 && (
        <SingleImage
          onClick={e => {
            e.stopPropagation();
            dispatch(openGallery('image', 0, images));
          }}
        >
          <img src={_.head(images).path} alt={_.head(images).fileName} />
          <Save>
            <a target="_blank" download href={_.head(images).path}>
              <SaveAlt color="inherit" />
            </a>
          </Save>
        </SingleImage>
      )}
      {(!isFeedModal || (isFeedModal && _.size(images) > 1)) && (
        <>
          {isFeedModal && (
            <Box marginTop={1} marginBottom={1}>
              <Avatar style={{ backgroundColor: '#F5F5F5' }}>
                <Image style={{ color: '#AEAEAE' }} />
              </Avatar>
            </Box>
          )}
          <Grid container spacing={2}>
            {_.map(_.take(images, 4), (image, index) => (
              <Grid item xs={6} md={3} key={`${image.fileName}${index}`}>
                {image.isInternal ? (
                  <Thumbnail
                    thumbnail_url={image.thumbUrl || image.thumbGalleryUrl}
                    onClick={e => {
                      e.stopPropagation();
                      dispatch(openGallery('image', index, images));
                    }}
                  >
                    {_.size(images) > 4 && index === 3 && (
                      <ListMore count={_.size(images) - 3} />
                    )}
                  </Thumbnail>
                ) : (
                  <a
                    href={image.path}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <Thumbnail thumbnail_url={image.thumbUrl}>
                      {_.size(images) > 4 && index === 3 && (
                        <ListMore count={_.size(images) - 3} />
                      )}
                    </Thumbnail>
                  </a>
                )}
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(ImageGallery);
