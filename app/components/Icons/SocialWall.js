import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Socialwall.svg';

function SocialWall(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 19 19" {...props} />;
}

export default memo(SocialWall);
