/**
 *
 * FeedShare
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ImageGallery from './ImageGallery';
import DocumentShare from './DocumentShare';
import DocumentGallery from './DocumentGallery';
import VideoGallery from './VideoGallery';
import Event from './Event';
import QuickPost from './QuickPost';
import Article from './Article';
import GrandArticle from './GrandArticle';
import JobOffer from './JobOffer';
import FAQ from './FAQ';

function FeedShare({ blocks, parseText, isFeedModal }) {
  const reference = _.find(blocks, { type: 'reference' });
  const imageGallery = _.find(blocks, { type: 'ImageGallery' });
  const documentGallery = _.find(blocks, { type: 'documentGallery' });
  const videoGallery = _.find(blocks, { type: 'videoGallery' });
  const linkEmbed = _.find(blocks, { type: 'linkEmbed' });
  const yammerEmbed = _.find(blocks, { type: 'yammerEmbed' });
  const event = _.find(blocks, { type: 'event' });
  const jobOffer = _.find(blocks, { type: 'jobOffer' });
  return (
    <>
      {reference.refType === 'quickpost' && (
        <QuickPost
          block={
            imageGallery ||
            documentGallery ||
            videoGallery ||
            linkEmbed ||
            yammerEmbed
          }
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'imageGallery' && imageGallery && (
        <ImageGallery
          images={imageGallery.images}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {!isFeedModal && reference.refType === 'document' && documentGallery && (
        <DocumentShare
          documents={documentGallery.documents}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {isFeedModal && reference.refType === 'document' && documentGallery && (
        <DocumentGallery
          documents={documentGallery.documents}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'videoGallery' && videoGallery && (
        <VideoGallery
          videos={videoGallery.videos}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'event' && event && (
        <Event
          blocks={[event]}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'jobOffer' && jobOffer && (
        <JobOffer
          jobOffer={jobOffer}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'article' && (
        <Article
          blocks={blocks}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'grandArticle' && (
        <GrandArticle
          blocks={blocks}
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
      {reference.refType === 'FAQquestion' && (
        <FAQ
          block={
            imageGallery ||
            documentGallery ||
            videoGallery ||
            linkEmbed ||
            yammerEmbed
          }
          parseText={parseText}
          isFeedModal={isFeedModal}
        />
      )}
    </>
  );
}

FeedShare.propTypes = {
  blocks: PropTypes.array,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(FeedShare);
