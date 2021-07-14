import axios from 'axios';
import { normalize } from 'normalizr';
import { widgetListSchema } from 'utils/normalizrSchema/widget';
import { feedSchema } from 'utils/normalizrSchema/feed';

export const carouselList = async options => {
  const response = await axios.get('/api/carousel/list', {
    params: options,
  });
  return response;
};

export const pinnedContent = async options => {
  const response = await axios.get('/api/content/pin', {
    params: { ...options },
  });
  return normalize(response.data.contents, [feedSchema]);
};

export const widgetList = async (options, cancelToken) => {
  const response = await axios.get('/api/widget/list', {
    params: options,
    cancelToken,
  });
  return normalize(response.data, widgetListSchema);
};

export const pinnedCommunityList = async cancelToken => {
  const response = await axios.get('/api/pin-community/list', { cancelToken });
  return response;
};

export const currentCommunity = async options => {
  const response = await axios.get('/api/community/', {
    params: { status: 'all', ...options },
  });
  return response;
};

export const content = async options => {
  const response = await axios.get('/api/content', {
    params: { ...options },
  });
  return response;
};
