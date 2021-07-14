/**
 *
 * FeedBlocksP2V8
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import ImageGallery from './ImageGallery';
import DocumentGallery from './DocumentGallery';
import VideoGallery from './VideoGallery';
import LinkGallery from './LinkGallery';
import Event from './Event';
import RichText from './RichText';
import YammerEmbed from './YammerEmbed';
// import messages from './messages';

function FeedBlocksP2V8(props) {
  const { block, contentUid } = props;
  switch (block.type) {
    case 'ImageGallery':
      return <ImageGallery images={block.images} />;
    case 'heading':
      return <ImageGallery images={[block.imageHeader]} />;
    case 'documentGallery':
      return <DocumentGallery documents={block.documents} />;
    case 'videoGallery':
      return <VideoGallery videos={block.videos} />;
    case 'linkEmbed':
      return <LinkGallery links={block.links} />;
    case 'event':
    case 'meetingEvent':
      return <Event event={block} contentUid={contentUid} />;
    case 'richText':
      return <RichText content={block.content} />;
    case 'yammerEmbed':
      return <YammerEmbed yammerLinks={block.yammerLinks} />;
    default:
      return null;
  }
}

FeedBlocksP2V8.propTypes = {
  block: PropTypes.object,
  contentUid: PropTypes.string,
};

export default memo(FeedBlocksP2V8);
