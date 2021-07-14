/**
 *
 * DocumentShare
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { DocumentThumb } from './Wrapper';

function DocumentShare({ documents, parseText }) {
  return (
    <Grid container spacing={2} wrap="nowrap">
      <Grid item>
        {_.size(documents) === 1 && (
          <DocumentThumb thumbnail_url={_.head(documents).thumbGalleryUrl} />
        )}
        {_.size(documents) > 1 && (
          <DocumentThumb
            thumbnail_url="http://v4dev.inspheris.net/images/documents.png"
            background_size="auto"
          >
            {_.size(documents)}
          </DocumentThumb>
        )}
      </Grid>
      <Grid item xs zeroMinWidth>
        <Typography variant="h6">{parseText}</Typography>
      </Grid>
    </Grid>
  );
}

DocumentShare.propTypes = {
  documents: PropTypes.array,
  parseText: PropTypes.string,
};

export default memo(DocumentShare);
