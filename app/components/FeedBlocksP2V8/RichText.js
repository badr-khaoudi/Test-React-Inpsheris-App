/**
 *
 * RichText
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { createMarkup } from 'utils/helpers/createMarkup';

function RichText({ content }) {
  return (
    <Typography
      component="div"
      dangerouslySetInnerHTML={createMarkup(content)}
      style={{ wordBreak: 'break-word' }}
    />
  );
}

RichText.propTypes = {
  content: PropTypes.string,
};

export default memo(RichText);
