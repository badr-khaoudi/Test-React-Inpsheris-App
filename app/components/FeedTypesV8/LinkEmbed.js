/**
 *
 * LinkEmbed
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { Thumbnail, LinkImage } from './Wrapper';
import ListMore from './ListMore';

function LinkEmbed({ links }) {
  if (_.size(links) === 1) {
    const link = _.head(links);
    return (
      <a href={link.path} target="_blank" rel="nofollow noopener noreferrer">
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={5} sm={4} md={3}>
            <LinkImage thumbnail_url={link.thumbnail_url} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="h6" gutterBottom>
              {link.title}
            </Typography>
            <LinesEllipsis text={link.description} maxLine={3} />
          </Grid>
        </Grid>
      </a>
    );
  }
  if (_.size(links) > 1) {
    return (
      <Grid container spacing={2} wrap="nowrap">
        {_.map(_.take(links, 4), (link, index) => (
          <Grid item xs={3} key={`${link.path}${index}`}>
            <a
              href={link.path}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Thumbnail thumbnail_url={link.thumbnail_url}>
                {_.size(links) > 4 && index === 3 && (
                  <ListMore count={_.size(links) - 3} />
                )}
              </Thumbnail>
            </a>
          </Grid>
        ))}
      </Grid>
    );
  }
}

LinkEmbed.propTypes = { links: PropTypes.array };

export default memo(LinkEmbed);
