/**
 *
 * GrandArticle
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { createMarkup } from 'utils/helpers/createMarkup';
import ImageGallery from './ImageGallery';
import DocumentGallery from './DocumentGallery';
import VideoGallery from './VideoGallery';
import { Thumbnail } from './Wrapper';

function GrandArticle({ blocks, parseText }) {
  const heading = _.find(blocks, { type: 'heading' });
  const richText = _.find(blocks, { type: 'richText' });
  const imageGallery = _.find(blocks, { type: 'ImageGallery' });
  const documentGallery = _.find(blocks, { type: 'documentGallery' });
  const videoGallery = _.find(blocks, { type: 'videoGallery' });
  return (
    <Grid container spacing={2} wrap="nowrap">
      {heading && heading.imageGridviewSmallThumb && (
        <Grid item xs={5} sm={4} md={3}>
          <Thumbnail
            thumbnail_url={
              heading.smallImage
                ? heading.imageGridviewSmallThumb
                : heading.imageGridviewThumb
            }
            background_size="contain"
            background_position="top"
          />
        </Grid>
      )}
      <Grid item xs zeroMinWidth>
        {parseText && (
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={createMarkup(parseText)}
          />
        )}
        <LinesEllipsis
          text={heading.subTitle ? heading.subTitle : richText.content}
          maxLine={3}
        />
        {imageGallery && <ImageGallery images={imageGallery.images} />}
        {documentGallery && (
          <DocumentGallery documents={documentGallery.documents} />
        )}
        {videoGallery && <VideoGallery videos={videoGallery.videos} />}
      </Grid>
    </Grid>
  );
}

GrandArticle.propTypes = {
  blocks: PropTypes.array,
  parseText: PropTypes.string,
};

export default memo(GrandArticle);
