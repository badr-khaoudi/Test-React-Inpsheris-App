import React from 'react';
import LinkEmbed from './LinkEmbed';
import ImageGallery from './ImageGallery';
import DocumentGallery from './DocumentGallery';
import VideoGallery from './VideoGallery';
import YammerEmbed from './YammerEmbed';
import Event from './Event';
import RichText from './RichText';

const CheckType = (block, isFeedModal = false) => {
  if (block.type === 'linkEmbed') {
    return <LinkEmbed links={block.links} isFeedModal={isFeedModal} />;
  }
  if (block.type === 'ImageGallery') {
    return <ImageGallery images={block.images} isFeedModal={isFeedModal} />;
  }
  if (block.type === 'documentGallery') {
    return (
      <DocumentGallery documents={block.documents} isFeedModal={isFeedModal} />
    );
  }
  if (block.type === 'videoGallery') {
    return <VideoGallery videos={block.videos} isFeedModal={isFeedModal} />;
  }
  if (block.type === 'yammerEmbed') {
    return (
      <YammerEmbed yammerLinks={block.yammerLinks} isFeedModal={isFeedModal} />
    );
  }
  if (block.type === 'event') {
    return <Event blocks={[block]} isFeedModal={isFeedModal} />;
  }
  if (block.type === 'richText') {
    return <RichText richText={block} />;
  }
  return null;
};

export default CheckType;
