import axios from 'axios';
import { normalize } from 'normalizr';
import { feedSchema } from 'utils/normalizrSchema/feed';

export const homeFeed = async (options, cancelToken) => {
  const response = await axios.get('/api/feed/home', {
    params: options,
    cancelToken,
  });
  const { contents, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(contents, [feedSchema]),
  };
};

export const contentDetails = async options => {
  const response = await axios.get('/api/content', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, feedSchema);
};

export const likeContent = async options => {
  const response = await axios.post('/api/like', {
    ...options,
  });
  return response;
};

export const unlikeContent = async options => {
  const response = await axios.delete('/api/like', {
    params: {
      ...options,
    },
  });
  return response;
};

export const deleteContent = async options => {
  const response = await axios.delete('/api/content', {
    params: {
      ...options,
    },
  });
  return response;
};

export const likeFollowerQuickpost = async options => {
  const response = await axios.post('api/like/followerQuickpost', {
    ...options,
  });
  return response;
};

export const unlikeFollowerQuickpost = async options => {
  const response = await axios.delete('api/like/followerQuickpost', {
    params: {
      ...options,
    },
  });
  return response;
};

export const likeMeetingEvent = async options => {
  const response = await axios.post('api/like/meeting-event', options);
  return response;
};

export const unlikeMeetingEvent = async options => {
  const response = await axios.delete('api/like/meeting-event', {
    params: options,
  });
  return response;
};
