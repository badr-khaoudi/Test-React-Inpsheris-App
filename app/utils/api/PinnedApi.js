import axios from 'axios';

export const getPinnedCommunityById = async (params, cancelToken) => {
  const response = await axios.get('/api/pin-community', {
    params,
    cancelToken,
  });

  return response;
};

export const createPinnedCommunity = async (payload, cancelToken) => {
  const response = await axios.post('/api/pin-community', payload, {
    cancelToken,
  });

  return response;
};
