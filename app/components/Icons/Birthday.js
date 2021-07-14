import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Birthday.svg';

function Birthday(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 17 18" {...props} />;
}

export default memo(Birthday);
