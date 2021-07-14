/**
 *
 * Yammer
 *
 */

import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent } from 'images/icons/yammerLogo.svg';

function Yammer(props) {
  return <SvgIcon component={ReactComponent} viewBox="0 0 32 32" {...props} />;
}

Yammer.propTypes = {};

export default memo(Yammer);
