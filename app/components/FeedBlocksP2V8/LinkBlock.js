/**
 *
 * LinkBlock
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { Grid, Typography } from '@material-ui/core';
import TypographyPrimary from 'utils/helpers/textPrimary';
import { LinkBox, LinkThumbnail } from './Wrapper';

const ResponsiveLinesEllipsis = responsiveHOC()(LinesEllipsis);

const LinkBlock = ({ link, isVisible }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isVisible || visible) {
      return;
    }
    setVisible(isVisible);
  }, [isVisible]);
  return (
    <a href={link.path} target="_blank" rel="nofollow noopener noreferrer">
      <LinkBox>
        <Grid container wrap="nowrap" spacing={2} alignItems="center">
          <Grid item xs={4}>
            <LinkThumbnail
              $background_image={link.thumbnail_url || link.thumbUrl}
              $background_size="contain"
            />
          </Grid>
          <Grid item xs={8}>
            {visible && (
              <ResponsiveLinesEllipsis
                text={link.description}
                maxLine={2}
                basedOn="letters"
                component={TypographyPrimary}
              />
            )}
            <Typography noWrap color="textSecondary">
              {link.path}
            </Typography>
          </Grid>
        </Grid>
      </LinkBox>
    </a>
  );
};

LinkBlock.propTypes = {
  link: PropTypes.object,
  isVisible: PropTypes.bool,
};

export default memo(LinkBlock);
