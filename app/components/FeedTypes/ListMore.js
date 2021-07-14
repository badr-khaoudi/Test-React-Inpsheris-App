/**
 *
 * ListMore
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { More } from './Wrapper';

function ListMore({ count }) {
  return <More>+{count}</More>;
}

ListMore.propTypes = { count: PropTypes.number };

export default memo(ListMore);
