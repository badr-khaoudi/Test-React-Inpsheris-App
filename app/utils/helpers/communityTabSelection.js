/* eslint-disable indent */
import _ from 'lodash';

const communityTabSelection = (
  communities,
  contentType,
  isPinnedTabAllowed,
  shareType = undefined,
) => {
  let type;
  if (contentType === 'article') {
    type = 'article';
  } else if (contentType === 'documentGallery') {
    type = 'document';
  } else if (contentType === 'ImageGallery') {
    type = 'imagegallery';
  } else if (contentType === 'event') {
    type = 'event';
  } else if (contentType === 'quickpost') {
    type = 'quickpost';
  }
  if (shareType === 'share') {
    return _.compact(
      _.map(communities, community => {
        if (community.communityType === 'Regular') {
          const tabs = _.filter(
            community.tabs,
            tab =>
              _.lowerCase(tab.tabType) === type ||
              _.lowerCase(tab.tabType) === 'collection' ||
              (tab.pinnedTab && isPinnedTabAllowed === true),
          );
          if (_.size(tabs) > 0) {
            return { ...community, tabs };
          }
        }
        return null;
      }),
    );
  }
  if (shareType === 'copy') {
    return _.compact(
      _.map(communities, community => {
        if (community.communityType === 'Regular') {
          const tabs = _.filter(
            community.tabs,
            tab =>
              _.lowerCase(tab.tabType) === type ||
              (tab.pinnedTab && isPinnedTabAllowed === true),
          );
          if (_.size(tabs) > 0) {
            return { ...community, tabs };
          }
        }
        return null;
      }),
    );
  }
  if (contentType === 'faq') {
    return _.compact(
      _.map(communities, community => {
        if (community.communityType === 'Regular') {
          const tabs = _.filter(
            community.tabs,
            tab =>
              _.lowerCase(tab.tabType) === 'faq' ||
              (tab.pinnedTab && isPinnedTabAllowed === true),
          );
          if (_.size(tabs) > 0) {
            return { ...community, tabs };
          }
        }
        return null;
      }),
    );
  }
  return _.compact(
    _.map(communities, community => {
      if (community.communityType === 'Regular') {
        const tabs = _.filter(
          community.tabs,
          tab =>
            _.lowerCase(tab.tabType) === type ||
            _.lowerCase(tab.tabType) === 'collection' ||
            (tab.pinnedTab && isPinnedTabAllowed === true),
        );
        if (_.size(tabs) > 0) {
          return { ...community, tabs };
        }
      }
      return null;
    }),
  );
};

export { communityTabSelection };
