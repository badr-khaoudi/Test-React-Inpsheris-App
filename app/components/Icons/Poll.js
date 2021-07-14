import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Polls.svg';

function Poll(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 15 15" {...props} />;
}

export default memo(Poll);
