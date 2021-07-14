/**
 *
 * YammerEmbed
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { Thumbnail, YammerDescription } from './Wrapper';
import ListMore from './ListMore';

function YammerEmbed({ yammerLinks }) {
  return (
    <Grid container spacing={2}>
      {_.map(_.take(yammerLinks, 4), (link, index) => (
        <Grid item xs={6} md={3} key={`${link.path}${index}`}>
          <a
            href={link.path}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Thumbnail thumbnail_url={link.thumbUrl}>
              {_.size(yammerLinks) > 4 && index === 3 && (
                <ListMore count={_.size(yammerLinks) - 3} />
              )}
              <YammerDescription>
                <LinesEllipsis text={link.description} maxLine={3} />
              </YammerDescription>
            </Thumbnail>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

YammerEmbed.propTypes = { yammerLinks: PropTypes.array };

export default memo(YammerEmbed);
