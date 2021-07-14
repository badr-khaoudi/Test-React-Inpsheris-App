import axios from 'axios';
import { normalize } from 'normalizr';
import qs from 'qs';
import { digestSchema } from 'utils/normalizrSchema/digest';
import { feedSchema } from 'utils/normalizrSchema/feed';

export const digestList = async options => {
  const response = await axios.get('api/digest/all', {
    params: {
      ...options,
    },
  });
  const { rows, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(rows, [digestSchema]),
  };
};

export const templates = async () => {
  const response = await axios.get('api/digest/templates');
  return response;
};

export const types = async () => {
  const response = await axios.get('api/digest/types');
  return response;
};

export const repeat = async () => {
  const response = await axios.get('api/digest/automated/repeat');
  return response;
};

export const contentTypes = async () => {
  const response = await axios.get('api/digest/automated/content-types');
  return response;
};

export const digest = async options => {
  const response = await axios.post('api/digest', {
    ...options,
  });
  return normalize(response.data, digestSchema);
};

export const activateDigest = async (params, options) => {
  const response = await axios.put('api/digest/activate', options, {
    params: {
      ...params,
    },
  });
  return response;
};

export const contentFilter = async options => {
  const response = await axios.get('api/content/filter', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const { contents, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(contents, [feedSchema]),
  };
};

export const digestContent = async options => {
  const response = await axios.get('api/digest', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, digestSchema);
};

export const userDigestList = async options => {
  const response = await axios.get('api/digest/list', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, [digestSchema]);
};

export const deleteDigest = async options => {
  const response = await axios.delete('api/digest', {
    params: {
      ...options,
    },
  });
  return response;
};
