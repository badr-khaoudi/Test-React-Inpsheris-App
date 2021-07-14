import React from 'react';
import _ from 'lodash';
import {
  LinkGallery,
  ImageGallery,
  DocumentGallery,
  VideoGallery,
  Event,
} from 'components/FeedTypesV8';

const CheckBlockType = block => {
  if (block === undefined) {
    return null;
  }
  if (block.type === 'ImageGallery') {
    return <ImageGallery images={block.images} />;
  }
  if (block.type === 'documentGallery') {
    return <DocumentGallery documents={block.documents} />;
  }
  if (block.type === 'videoGallery') {
    return <VideoGallery videos={block.videos} />;
  }
  if (block.type === 'linkEmbed') {
    return <LinkGallery links={block.links} />;
  }
  return null;
};

const CheckFeedBlock = content => {
  const reference = _.find(content.blocks, { type: 'reference' });
  if (
    content.type === 'imageGallery' ||
    ((content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
      reference &&
      reference.refType === 'imageGallery')
  ) {
    return (
      <ImageGallery
        images={_.find(content.blocks, { type: 'ImageGallery' }).images}
      />
    );
  }
  if (
    content.type === 'document' ||
    ((content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
      (reference &&
        (reference.refType === 'document' ||
          reference.refType === 'transferred document')))
  ) {
    return (
      <DocumentGallery
        documents={
          _.find(content.blocks, { type: 'documentGallery' }).documents
        }
      />
    );
  }
  if (
    content.type === 'videoGallery' ||
    ((content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
      reference &&
      reference.refType === 'videoGallery')
  ) {
    return (
      <VideoGallery
        videos={_.find(content.blocks, { type: 'videoGallery' }).videos}
      />
    );
  }
  if (
    content.type === 'event' ||
    content.type === 'meetingEvent' ||
    ((content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
      (reference &&
        (reference.refType === 'event' ||
          reference.refType === 'meetingEvent')))
  ) {
    return <Event event={_.find(content.blocks, { type: 'event' })} />;
  }
  if (
    (content.type === 'quickpost' || content.type === 'FAQquestion') &&
    _.size(content.blocks) > 0
  ) {
    return CheckBlockType(
      _.find(content.blocks, block => block.type !== 'text'),
    );
  }
  if (
    (content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
    (reference &&
      (reference.refType === 'quickpost' ||
        reference.refType === 'FAQquestion'))
  ) {
    return CheckBlockType(
      _.head(
        _.filter(
          content.blocks,
          block =>
            block.type !== 'reference' &&
            block.type !== 'heading' &&
            block.type !== 'text',
        ),
      ),
    );
  }
  if (
    (content.type === 'article' ||
      content.type === 'grandArticle' ||
      ((content.type === 'share' ||
        content.type === 'follower quickpost sharing') &&
        (reference &&
          (reference.refType === 'article' ||
            reference.refType === 'grandArticle')))) &&
    _.find(content.blocks, { type: 'heading' }) &&
    _.find(content.blocks, { type: 'heading' }).imageHeader
  ) {
    return (
      <ImageGallery
        images={[_.find(content.blocks, { type: 'heading' }).imageHeader]}
      />
    );
  }
  if (
    content.type === 'quickSharingOfTheLink' ||
    ((content.type === 'share' ||
      content.type === 'follower quickpost sharing') &&
      (reference && reference.refType === 'quickSharingOfTheLink'))
  ) {
    return (
      <LinkGallery
        links={_.find(content.blocks, { type: 'linkEmbed' }).links}
      />
    );
  }
  return null;
};

export default CheckFeedBlock;
