import axios from 'axios';
import qs from 'qs';
import { normalize } from 'normalizr';
import { userSchema } from 'utils/normalizrSchema/feed';

export const searchDirectory = async options => {
  const response = await axios.get('api/search/searchDirectory', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const { members, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(members, [userSchema]),
  };
};

export const suggestion = async (options, config) => {
  const response = await axios.get('api/search/suggestion', {
    params: { ...options },
    ...config,
  });
  return response;
};

export const filterList = async options => {
  const response = await axios.get('api/user/filterList', {
    params: { ...options },
  });
  return response;
};

export const hobbyList = async options => {
  const response = await axios.get('api/user/hobby/list', {
    params: { ...options },
  });
  return response;
};

export const badgeList = async options => {
  const response = await axios.get('api/badge/list', {
    params: { ...options },
  });
  return response;
};
