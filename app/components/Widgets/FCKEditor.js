/**
 *
 * FCKEditor
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { createMarkup } from 'utils/helpers/createMarkup';

function FCKEditor({ content }) {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={createMarkup(content)} />;
}

FCKEditor.propTypes = {
  content: PropTypes.string,
};

export default memo(FCKEditor);
