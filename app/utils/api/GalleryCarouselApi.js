import axios from 'axios';
import qs from 'qs';

export const getMediaManagerList = async options => {
  const res = await axios.get('/api/mediamanager/list', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return res;
};

export const downloadAllAsZip = async options => {
  const res = await axios.post('/api/mediamanager/downloadAllAsZip', options);
  return res;
};
