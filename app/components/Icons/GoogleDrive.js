import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Drive_Product_Icon.svg';

function GoogleDrive(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 94 94" {...props} />;
}

export default memo(GoogleDrive);
