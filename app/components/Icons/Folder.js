import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/Folder_icon.svg';

function Folder(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 51 43" {...props} />;
}

Folder.propTypes = {};

export default memo(Folder);
