import React from 'react';
import {
  Birthday,
  VideoGallery,
  Newcomer,
  Meeting,
  FlexDesk,
  Poll,
} from './exports';

const CheckType = widget => {
  if (widget.type === 'VideoGallery') {
    return (
      <VideoGallery title={widget.title} videoGallery={widget.videoGallery} />
    );
  }
  if (widget.type === 'Newcomer') {
    return <Newcomer title={widget.title} newcomerData={widget.newcomerData} />;
  }
  if (widget.type === 'Poll') {
    return (
      <Poll
        title={widget.title}
        uid={widget.uid}
        questions={widget.questions}
      />
    );
  }
  if (widget.type === 'Birthday') {
    return <Birthday todayBirthdays={widget.todayBirthdays} />;
  }
  if (widget.type === 'RegularCalendar' && !widget.defaultWidget) {
    return <Meeting title={widget.title} widget={widget} />;
  }
  if (widget.type === 'LivelyFlexDesk') {
    return <FlexDesk title={widget.title} />;
  }
  return null;
};

export default CheckType;
