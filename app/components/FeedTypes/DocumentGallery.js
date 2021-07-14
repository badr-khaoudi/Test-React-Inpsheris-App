/**
 *
 * DocumentGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Box, Avatar } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { createMarkup } from 'utils/helpers/createMarkup';
import { openGallery } from 'containers/AuthBase/actions';
import { Document, Thumbnail } from './Wrapper';
import ListMore from './ListMore';

function DocumentGallery({ documents, parseText, isFeedModal }) {
  const dispatch = useDispatch();
  return (
    <>
      {parseText && (
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={createMarkup(parseText)}
        />
      )}
      {isFeedModal && (
        <Box marginTop={1} marginBottom={1}>
          <Avatar style={{ backgroundColor: '#F5F5F5' }}>
            <Folder style={{ color: '#AEAEAE' }} />
          </Avatar>
        </Box>
      )}
      <Grid container spacing={2}>
        {_.map(_.take(documents, 4), (document, index) => (
          <Grid item xs={6} md={3} key={`${document.fileName}${index}`}>
            {document.isInternal ? (
              <Document
                onClick={e => {
                  e.stopPropagation();
                  dispatch(openGallery('documents', index, documents));
                }}
              >
                <Thumbnail thumbnail_url={document.thumbUrl} />
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  noWrap
                >
                  {document.fileName}
                </Typography>
                {_.size(documents) > 4 && index === 3 && (
                  <ListMore count={_.size(documents) - 3} />
                )}
              </Document>
            ) : (
              <a
                href={document.path}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Document>
                  <Thumbnail thumbnail_url={document.thumbUrl} />
                  <Typography variant="caption" display="block" align="center">
                    {document.fileName}
                  </Typography>
                  {_.size(documents) > 4 && index === 3 && (
                    <ListMore count={_.size(documents) - 3} />
                  )}
                </Document>
              </a>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

DocumentGallery.propTypes = {
  documents: PropTypes.array,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(DocumentGallery);
