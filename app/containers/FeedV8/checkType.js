import React from 'react';
import _ from 'lodash';
import {
  LinkGallery,
  ImageGallery,
  DocumentGallery,
  VideoGallery,
  Event,
  Article,
  GrandArticle,
  JobOffer,
} from 'components/FeedTypesV8';
import QuickPost from 'components/FeedTypesV8/QuickPost';
import FAQ from 'components/FeedTypesV8/FAQ';
import FeedShare from 'components/FeedTypesV8/FeedShare';

const CheckType = (type, blocks, parseText, subTitle, isFeedModal = false) => {
  const imageGallery = _.find(blocks, { type: 'ImageGallery' });
  const documentGallery = _.find(blocks, { type: 'documentGallery' });
  const videoGallery = _.find(blocks, { type: 'videoGallery' });
  const linkEmbed = _.find(blocks, { type: 'linkEmbed' });
  const yammerEmbed = _.find(blocks, { type: 'yammerEmbed' });
  const jobOffer = _.find(blocks, { type: 'jobOffer' });
  if (type === 'quickpost') {
    return (
      <QuickPost
        block={
          imageGallery ||
          documentGallery ||
          videoGallery ||
          linkEmbed ||
          yammerEmbed
        }
        parseText={parseText}
        subTitle={subTitle}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'share') {
    return (
      <FeedShare
        blocks={blocks}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'imageGallery' && imageGallery) {
    return (
      <ImageGallery
        images={imageGallery.images}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'videoGallery' && videoGallery) {
    return (
      <VideoGallery
        videos={videoGallery.videos}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'document' && documentGallery) {
    return (
      <DocumentGallery
        documents={documentGallery.documents}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'FAQquestion') {
    return (
      <FAQ
        block={
          imageGallery ||
          documentGallery ||
          videoGallery ||
          linkEmbed ||
          yammerEmbed
        }
        parseText={parseText}
        subTitle={subTitle}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'event' || type === 'meetingEvent') {
    return (
      <Event event={blocks} parseText={parseText} isFeedModal={isFeedModal} />
    );
  }
  if (type === 'article') {
    return (
      <Article
        blocks={blocks}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'grandArticle') {
    return (
      <GrandArticle
        blocks={blocks}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'jobOffer') {
    return (
      <JobOffer
        jobOffer={jobOffer}
        parseText={parseText}
        isFeedModal={isFeedModal}
      />
    );
  }
  if (type === 'quickSharingOfTheLink') {
    return <LinkGallery links={linkEmbed.links} isFeedModal={isFeedModal} />;
  }
  return null;
};

export default CheckType;
