/**
 *
 * WidgetIcons
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Calendar } from 'images/icons/Calendar.svg';
import { ReactComponent as Image } from 'images/icons/Image.svg';
import { ReactComponent as Settings } from 'images/icons/Settings.svg';
import { ReactComponent as Time } from 'images/icons/Time.svg';
import Facebook from './Facebook';
import Instagram from './Instagram';
import LinkedIn from './LinkedIn';
import Newcomer from './Newcomer';
import Poll from './Poll';
import Twitter from './Twitter';
import YouTube from './YouTube';
import SocialWall from './SocialWall';
import FlexDesk from './FlexDesk';
import Birthday from './Birthday';
import Dailymotion from './Dailymotion';

function WidgetIcons({ type, ...props }) {
  switch (type) {
    case 'Facebook':
      return <Facebook {...props} />;
    case 'Instagram':
      return <Instagram {...props} />;
    case 'LinkedIn':
      return <LinkedIn {...props} />;
    case 'Twitter':
      return <Twitter {...props} />;
    case 'Dailymotion':
      return <Dailymotion {...props} />;
    case 'Youtube':
    case 'YouTube':
      return <YouTube {...props} />;
    case 'RegularCalendar':
    case 'AutomatedCalendar':
    case 'GoogleCalendar':
      return <SvgIcon component={Calendar} viewBox="0 0 20 19" {...props} />;
    case 'ImageGallery':
      return <SvgIcon component={Image} viewBox="0 0 21 16" {...props} />;
    case 'CountdownClock':
      return <SvgIcon component={Time} viewBox="0 0 17 17" {...props} />;
    case 'Birthday':
      return <Birthday {...props} />;
    case 'Newcomer':
      return <Newcomer {...props} />;
    case 'Application':
      return <SvgIcon component={Settings} viewBox="0 0 20 20" {...props} />;
    case 'Poll':
      return <Poll {...props} />;
    case 'LivelyFlexDesk':
    case 'FlexDesk':
      return <FlexDesk {...props} />;
    case 'SocialWall':
      return <SocialWall {...props} />;
    default:
      return null;
  }
}

WidgetIcons.propTypes = { type: PropTypes.string };

export default memo(WidgetIcons);
