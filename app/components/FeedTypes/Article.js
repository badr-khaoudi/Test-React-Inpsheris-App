/**
 *
 * Article
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { createMarkup } from 'utils/helpers/createMarkup';
import { ArticleThumb } from './Wrapper';
import CheckType from './checkType';

function Article({ blocks, parseText, isFeedModal }) {
  const heading = _.find(blocks, { type: 'heading' });
  const richText = _.find(blocks, { type: 'richText' });
  return (
    <Grid container spacing={2} wrap="nowrap">
      {!isFeedModal && heading && heading.imageGridviewSmallThumb && (
        <Grid item xs={5} sm={4} md={3}>
          <ArticleThumb heading={heading}>
            <img src={heading.imageHeader} alt={heading.title} />
          </ArticleThumb>
        </Grid>
      )}
      <Grid item xs zeroMinWidth>
        {!isFeedModal && parseText && (
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={createMarkup(parseText)}
          />
        )}
        {!isFeedModal && (
          <LinesEllipsis
            text={heading.subTitle ? heading.subTitle : richText.content}
            maxLine={3}
          />
        )}
        {isFeedModal &&
          _.map(_.omitBy(blocks, { type: 'heading' }), (block, index) => (
            <React.Fragment key={index}>
              {CheckType(block, isFeedModal)}
            </React.Fragment>
          ))}
      </Grid>
    </Grid>
  );
}

Article.propTypes = {
  blocks: PropTypes.array,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(Article);
