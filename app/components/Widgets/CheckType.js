import React from 'react';
import FeatureNotAvailable from 'components/FeatureNotAvailable';
import CountdownClock from './CountdownClock';
import FCKEditor from './FCKEditor';
import ImageGallery from './ImageGallery';
import VideoGallery from './VideoGallery';
import Dailymotion from './Dailymotion';
import Youtube from './Youtube';
import LatestPost from './LatestPost';
import RSS from './RSS';
import Twitter from './Twitter';
import LinkedIn from './LinkedIn';
import Newcomer from './Newcomer';
import Facebook from './Facebook';
import Poll from './Poll';
import Birthday from './Birthday';
import Instagram from './Instagram';
import LivelyForm from './LivelyForm';
import DefaultRegularCalendar from './DefaultRegularCalendar';
import RegularCalendar from './RegularCalendar';
import Admin from './Admin';

const CheckType = (widget, comunityId, userUid) => {
  if (widget.type === 'CountdownClock') {
    return <CountdownClock countdownClockData={widget.countdownClockData} />;
  }
  if (widget.type === 'FCKEditor') {
    return <FCKEditor content={widget.content} />;
  }
  if (widget.type === 'ImageGallery') {
    return <ImageGallery imageGallery={widget.imageGallery} />;
  }
  if (widget.type === 'VideoGallery') {
    return <VideoGallery videoGallery={widget.videoGallery} />;
  }
  if (widget.type === 'Dailymotion') {
    return <Dailymotion dailymotionData={widget.dailymotionData} />;
  }
  if (widget.type === 'Youtube') {
    return <Youtube youtubeData={widget.youtubeData} />;
  }
  if (widget.type === 'LatestPost') {
    return <LatestPost latestPostData={widget.latestPostData} />;
  }
  if (widget.type === 'RSS') {
    return <RSS widget={widget} />;
  }
  if (widget.type === 'Twitter') {
    return <Twitter twitterData={widget.twitterData} />;
  }
  if (widget.type === 'LinkedIn') {
    return <LinkedIn linkedInData={widget.linkedInData} />;
  }
  if (widget.type === 'Newcomer') {
    return <Newcomer newcomerData={widget.newcomerData} />;
  }
  if (widget.type === 'Facebook') {
    return <Facebook facebookData={widget.facebookData} />;
  }
  if (widget.type === 'Poll') {
    return <Poll uid={widget.uid} questions={widget.questions} />;
  }
  if (widget.type === 'Birthday') {
    return (
      <Birthday
        todayBirthdays={widget.todayBirthdays}
        nextBirthdays={widget.nextBirthdays}
      />
    );
  }
  if (widget.type === 'Instagram') {
    return <Instagram instagramData={widget.instagramData} />;
  }
  if (widget.type === 'LivelyForm') {
    return <LivelyForm link={widget.link} />;
  }
  if (widget.type === 'RegularCalendar' && widget.defaultWidget) {
    return (
      <DefaultRegularCalendar
        widget={widget}
        comunityId={comunityId}
        userUid={userUid}
      />
    );
  }
  if (widget.type === 'RegularCalendar' && !widget.defaultWidget) {
    return <RegularCalendar widget={widget} />;
  }
  if (comunityId && widget.type === 'Admin') {
    return <Admin community={widget.community} />;
  }
  return <FeatureNotAvailable feature={widget.type} />;
};

export default CheckType;
