/**
 *
 * LinkEmbed
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography, Box, Avatar } from '@material-ui/core';
import { Link as LinkIcon } from '@material-ui/icons';
import LinesEllipsis from 'react-lines-ellipsis';
import { Thumbnail, LinkImage } from './Wrapper';
import ListMore from './ListMore';

function LinkEmbed({ links, isFeedModal }) {
  if (_.size(links) === 1) {
    const link = _.head(links);
    return (
      <>
        {isFeedModal && (
          <Box marginTop={1} marginBottom={1}>
            <Avatar style={{ backgroundColor: '#F5F5F5' }}>
              <LinkIcon style={{ color: '#AEAEAE' }} />
            </Avatar>
          </Box>
        )}
        <a
          href={link.path}
          onClick={e => e.stopPropagation()}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Grid container spacing={2} wrap="nowrap">
            <Grid item xs={4} sm={3} md={2}>
              <LinkImage thumbnail_url={link.thumbnail_url} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h6"
                gutterBottom
                style={{ wordBreak: 'break-word' }}
              >
                {link.title}
              </Typography>
              <LinesEllipsis
                text={link.description}
                maxLine={3}
                style={{ wordBreak: 'break-word' }}
              />
              <Grid container alignItems="center" wrap="nowrap">
                {link.favicon && (
                  <img
                    src={link.favicon}
                    alt={link.title}
                    height={20}
                    width={20}
                    style={{ marginRight: 5 }}
                  />
                )}
                <Typography noWrap>{link.path}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </a>
      </>
    );
  }
  if (_.size(links) > 1) {
    return (
      <>
        {isFeedModal && (
          <Box marginTop={1} marginBottom={1}>
            <Avatar style={{ backgroundColor: '#F5F5F5' }}>
              <LinkIcon style={{ color: '#AEAEAE' }} />
            </Avatar>
          </Box>
        )}
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
      </>
    );
  }
}

LinkEmbed.propTypes = { links: PropTypes.array, isFeedModal: PropTypes.bool };

export default memo(LinkEmbed);
