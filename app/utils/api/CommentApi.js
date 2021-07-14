import axios from 'axios';
import { normalize } from 'normalizr';
import { commentsSchema } from 'utils/normalizrSchema/feed';

export const comment = async options => {
  const response = await axios.post('api/comment', options);
  return normalize(response.data, commentsSchema);
};

export const likeComment = async options => {
  const response = await axios.post('api/like/comment', options);
  return response;
};

export const unlikeComment = async options => {
  const response = await axios.delete('api/like/comment', {
    params: {
      ...options,
    },
  });
  return response;
};

export const pickComment = async (params, options) => {
  const response = await axios.put('api/comment/pick', options, {
    params: {
      ...params,
    },
  });
  return normalize(response.data, commentsSchema);
};

export const deleteComment = async options => {
  const response = await axios.delete('api/comment', {
    params: {
      ...options,
    },
  });
  return response;
};

export const commentList = async options => {
  const response = await axios.get('api/comment/list', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, [commentsSchema]);
};
