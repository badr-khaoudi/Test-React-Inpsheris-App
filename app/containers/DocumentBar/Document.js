/**
 *
 * Document
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Thumbnail } from 'components/FeedTypesV8/Wrapper';
import { initials } from 'utils/helpers/avatarInitials';
import { Box } from './Wrapper';
import { makeSelectThumbnail } from './selectors';

function Document({
  id,
  link,
  name,
  date,
  thumbGalleryUrl,
  headerLogoUrl,
  user,
  onClick,
  allowSelect,
  checked,
  onChange,
}) {
  const thumbnail = useSelector(makeSelectThumbnail(id));
  return (
    <Paper
      variant="outlined"
      square
      component="a"
      href={link}
      target="_blank"
      style={{ display: 'flex' }}
      role="button"
      onClick={onClick}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Grid container wrap="nowrap" spacing={1}>
              {allowSelect && (
                <Grid item>
                  <Checkbox
                    checked={checked}
                    onClick={e => e.stopPropagation()}
                    onChange={onChange({
                      fileName: name,
                      fileUploadedDate: date,
                    })}
                  />
                </Grid>
              )}
              <Grid item xs zeroMinWidth>
                <Typography noWrap gutterBottom color="inherit">
                  {name}
                </Typography>
                <Typography variant="caption" noWrap color="inherit">
                  {`Uploaded on ${moment(date).format('LL')}`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Thumbnail
            thumbnail_url={
              thumbnail &&
              thumbnail.status === 200 &&
              !_.isEmpty(thumbnail.body.value)
                ? thumbnail.body.value[0].medium.url
                : thumbGalleryUrl
            }
            background_size="contain"
            background_position="center"
          />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Avatar src={headerLogoUrl}>{initials(user)}</Avatar>
              </Grid>
              <Grid item>
                <Typography color="inherit">{user}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

Document.propTypes = {
  id: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  thumbGalleryUrl: PropTypes.string,
  headerLogoUrl: PropTypes.string,
  user: PropTypes.string,
  onClick: PropTypes.func,
  allowSelect: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default memo(Document);
