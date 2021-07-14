import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Instagram.svg';

function Instagram(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 34 34" {...props} />;
}

export default memo(Instagram);
