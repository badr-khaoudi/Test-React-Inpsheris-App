import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Newcomers.svg';

function Newcomer(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 18 18" {...props} />;
}

export default memo(Newcomer);
