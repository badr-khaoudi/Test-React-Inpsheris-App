/**
 *
 * RichText
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { createMarkup } from 'utils/helpers/createMarkup';

function RichText({ richText }) {
  return (
    <Typography
      variant="body1"
      gutterBottom
      dangerouslySetInnerHTML={createMarkup(richText.content)}
    />
  );
}

RichText.propTypes = {
  richText: PropTypes.object,
};

export default memo(RichText);
