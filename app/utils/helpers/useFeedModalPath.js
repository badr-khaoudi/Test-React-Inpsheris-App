import { useSelector } from 'react-redux';
import {
  makeSelectCommunity,
  makeSelectCommunityTab,
} from 'containers/GlobalEntities/selectors';

const useFeedModalPath = (
  communityUid,
  communityTabUid,
  uid,
  mode,
  referrer,
) => {
  const community = useSelector(makeSelectCommunity(communityUid));
  const communityTab = useSelector(makeSelectCommunityTab(communityTabUid));
  if (community && communityTab) {
    return `/community/${encodeURIComponent(community.label)}/${
      community.uid
    }/${communityTab.uid}/${uid}/${mode}/${referrer}`;
  }
  return null;
};

export default useFeedModalPath;
