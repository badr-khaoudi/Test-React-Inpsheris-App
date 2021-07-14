import axios from 'axios';
import qs from 'qs';
import { normalize } from 'normalizr';
import { userSchema } from 'utils/normalizrSchema/feed';

export const fileType = async () => {
  const response = await axios.get('/api/community/file/type/all');
  return response;
};

export const authorList = async options => {
  const response = await axios.get('/api/community/file/author/list', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, [userSchema]);
};

export const fileList = async options => {
  const response = await axios.get('/api/community/file/list', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return response;
};

export const downloadAllAsZip = async options => {
  const response = await axios.post(
    '/api/mediamanager/downloadAllAsZip',
    options,
  );
  return response;
};
