import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/oneDriveLogo.svg';

function OneDrive(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 32 32" {...props} />;
}

export default memo(OneDrive);
