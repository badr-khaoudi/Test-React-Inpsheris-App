/**
 *
 * FAQ
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { createMarkup } from 'utils/helpers/createMarkup';
import CheckType from './checkType';

function FAQ({ block, parseText, subTitle, isFeedModal }) {
  return (
    <>
      {parseText && (
        <Typography
          variant="body1"
          gutterBottom
          dangerouslySetInnerHTML={createMarkup(parseText)}
        />
      )}
      {subTitle && <Typography variant="subtitle1">{subTitle}</Typography>}
      {block && CheckType(block, isFeedModal)}
    </>
  );
}

FAQ.propTypes = {
  block: PropTypes.object,
  parseText: PropTypes.string,
  subTitle: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(FAQ);
