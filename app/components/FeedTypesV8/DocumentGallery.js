/**
 *
 * DocumentGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { GetApp } from '@material-ui/icons';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { openGallery } from 'containers/AuthBase/actions';
import { FileType, Thumbnail } from './Wrapper';
import useStyles from './useStyles';

SwiperCore.use([Navigation, Virtual]);

const Document = memo(({ document, onClick }) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.root}
      style={{
        borderRadius: 5,
        padding: 20,
        paddingBottom: 45,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FileType
            label={_.toUpper(_.last(_.split(document.fileName, '.')))}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography noWrap>{document.fileName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Thumbnail thumbnail_url={document.thumbUrl} />
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="flex-end">
            <IconButton href={document.path} download edge="end">
              <GetApp fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
});

Document.propTypes = { document: PropTypes.object, onClick: PropTypes.func };

const DocumentGallery = ({ documents }) => {
  const dispatch = useDispatch();
  if (_.size(documents) > 3) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        virtual
        style={{ padding: '0 25px' }}
      >
        {_.map(documents, (document, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            {document.isInternal ? (
              <Document
                document={document}
                onClick={() => {
                  dispatch(openGallery('documents', index, documents));
                }}
              />
            ) : (
              <a
                href={document.path}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                <Document document={document} />
              </a>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 25px' }}
    >
      {_.map(documents, (document, index) => (
        <Grid item xs={4} key={index} style={{ padding: 15 }}>
          {document.isInternal ? (
            <Document
              document={document}
              onClick={() => {
                dispatch(openGallery('documents', index, documents));
              }}
            />
          ) : (
            <a
              href={document.path}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Document document={document} />
            </a>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

DocumentGallery.propTypes = { documents: PropTypes.array };

export default memo(DocumentGallery);
