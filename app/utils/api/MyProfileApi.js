import axios from 'axios';
import { normalize } from 'normalizr';
import qs from 'qs';
import _ from 'lodash';
import {
  userSchema,
  feedSchema,
  communitySchema,
} from 'utils/normalizrSchema/feed';
import { profileSchema } from 'utils/normalizrSchema/profile';
import { widgetListSchema } from 'utils/normalizrSchema/widget';

export const user = async options => {
  const response = await axios.get('api/user', {
    params: { ...options },
  });
  return normalize(response.data, profileSchema);
};

export const authorList = async options => {
  const response = await axios.get('api/content/author/list', {
    params: { ...options },
  });
  return normalize(response.data, [userSchema]);
};

export const follow = async options => {
  const response = await axios.post('api/user/follow', {
    ...options,
  });
  return response;
};

export const profile = async options => {
  const response = await axios.get('api/content/profile', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const { contents, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(contents, [feedSchema]),
  };
};

export const drafts = async options => {
  const response = await axios.get('api/content/drafts', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const { contents, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(contents, [feedSchema]),
  };
};

export const publications = async options => {
  const response = await axios.get('api/content/publications', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const { contents, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(contents, [feedSchema]),
  };
};

export const updateStatus = async options => {
  const response = await axios.post('api/content/updateStatus', {
    ...options,
  });
  return response;
};

export const communityListUser = async options => {
  const response = await axios.get('api/community/list/user', {
    params: { ...options },
  });
  return normalize(response.data, [communitySchema]);
};

export const addCoworker = async options => {
  const response = await axios.post('api/user/add-coworker', options);
  return response;
};

export const addPartner = async options => {
  const response = await axios.post('api/user/add-partner', options);
  return response;
};

export const customFieldList = async options => {
  const response = await axios.get('api/customfield/list', {
    params: { ...options },
  });
  return response;
};

export const editUser = async options => {
  const response = await axios.post('api/user', {
    ...options,
  });
  return normalize(response.data, profileSchema);
};

export const addSpeciality = async options => {
  const response = await axios.post('api/user/speciality', {
    ...options,
  });
  return response;
};

export const deleteSpeciality = async options => {
  const response = await axios.delete('api/user/speciality', {
    params: {
      ...options,
    },
  });
  return response;
};

export const editSpeciality = async (params, options) => {
  const response = await axios.put('api/user/speciality', options, {
    params: {
      ...params,
    },
  });
  return response;
};

export const specialityList = async options => {
  const response = await axios.get('api/user/speciality/list', {
    params: { ...options },
  });
  return response;
};

export const userLikedList = async options => {
  const response = await axios.get('api/content/liked-by-user/list', {
    params: { ...options },
  });
  const { rows, ...rest } = response.data;
  return {
    response: rest,
    ...normalize(_.map(rows, row => row.content), [feedSchema]),
  };
};

export const pinnedPostList = async options => {
  const response = await axios.get('api/user/pinned-post/list', {
    params: { ...options },
  });
  return response;
};

export const createPinnedPost = async options => {
  const response = await axios.post('api/user/pinned-post', {
    ...options,
  });
  return response;
};

export const editPinnedPost = async (params, options) => {
  const response = await axios.put('api/user/pinned-post', options, {
    params: {
      ...params,
    },
  });
  return response;
};

export const deletePinnedPost = async options => {
  const response = await axios.delete('api/user/pinned-post', {
    params: {
      ...options,
    },
  });
  return response;
};

export const likePinnedPost = async options => {
  const response = await axios.post('api/like/user/pinned-post', {
    ...options,
  });
  return response;
};

export const unlikePinnedPost = async options => {
  const response = await axios.delete('api/like/user/pinned-post', {
    params: {
      ...options,
    },
  });
  return response;
};

export const pinnedPostType = async options => {
  const response = await axios.get('api/user/pinned-post/type', {
    params: { ...options },
  });
  return response;
};

export const changePhoto = async options => {
  const response = await axios.post('api/user/changePhoto', {
    ...options,
  });
  return normalize(response.data, userSchema);
};

export const userProfile = async (options, cancelToken) => {
  const response = await axios.get('api/user/profile', {
    params: { ...options },
    cancelToken,
  });
  return normalize(response.data, userSchema);
};

export const widgetList = async options => {
  const response = await axios.get('api/widget/user/list', {
    params: { ...options },
  });
  return normalize(response.data, widgetListSchema);
};
