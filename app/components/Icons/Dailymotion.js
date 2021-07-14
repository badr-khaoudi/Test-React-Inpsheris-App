import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/dailymotion.svg';

function Dailymotion(props) {
  return (
    <SvgIcon component={ReactComponent} viewBox="0 0 128 128" {...props} />
  );
}

export default memo(Dailymotion);
