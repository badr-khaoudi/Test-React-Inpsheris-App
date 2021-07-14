/* eslint-disable no-nested-ternary */
/**
 *
 * DocumentGallery
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { openGallery } from 'containers/AuthBase/actions';
import { DocumentIcons, GoogleDrive, OneDrive } from 'components/Icons';
import { RoundedBox, DocumentThumbnail } from './Wrapper';

const Document = memo(({ document, onClick }) => (
  <a
    href={document.path}
    target="_blank"
    onClick={e => onClick(e, document.isInternal)}
  >
    <RoundedBox>
      <Grid container wrap="nowrap" spacing={1}>
        {!document.isInternal && (
          <Grid item>
            {document.externalSource === 'GoogleDrive' ? (
              <GoogleDrive />
            ) : document.externalSource === 'OneDrive' ? (
              <OneDrive />
            ) : null}
          </Grid>
        )}
        <Grid item xs zeroMinWidth>
          <Typography noWrap color="textPrimary">
            {document.fileName}
          </Typography>
        </Grid>
      </Grid>

      <DocumentThumbnail $background_image={document.thumbUrl}>
        {!document.thumbUrl && (
          <DocumentIcons type={document.fileType} style={{ fontSize: '6em' }} />
        )}
      </DocumentThumbnail>
    </RoundedBox>
  </a>
));

Document.propTypes = {
  document: PropTypes.object,
  onClick: PropTypes.func,
};

SwiperCore.use([Navigation, Virtual]);

function DocumentGallery({ documents }) {
  const dispatch = useDispatch();
  const handleClick = useCallback(index => (e, isInternal) => {
    if (isInternal) {
      e.preventDefault();
      dispatch(openGallery('documents', index, documents));
    }
  });
  if (_.size(documents) > 3) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        virtual
        style={{ padding: '0 15px' }}
      >
        {_.map(documents, (document, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            <Document document={document} onClick={handleClick(index)} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 15px' }}
    >
      {_.map(documents, (document, index) => (
        <Grid item xs={4} key={index} style={{ padding: 15 }}>
          <Document document={document} onClick={handleClick(index)} />
        </Grid>
      ))}
    </Grid>
  );
}

DocumentGallery.propTypes = {
  documents: PropTypes.array,
};

export default memo(DocumentGallery);
