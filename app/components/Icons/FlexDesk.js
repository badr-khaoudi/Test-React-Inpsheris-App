import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/LivelyDesk.svg';

function FlexDesk(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 18 18" {...props} />;
}

export default memo(FlexDesk);
