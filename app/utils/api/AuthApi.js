import axios from 'axios';
import qs from 'qs';
import { normalize } from 'normalizr';
import { merge } from 'lodash';
import {
  userSchema,
  communitySchema,
  feedSchema,
} from 'utils/normalizrSchema/feed';

export const checkSession = async () => {
  const response = await axios.get('/api/session/check');
  return response;
};

export const languageList = async () => {
  const response = await axios.get('/api/language/list');
  return response;
};

export const configList = async () => {
  const response = await axios.get('/api/config/list');
  return response;
};

export const customTemplateList = async () => {
  const response = await axios.get('api/custom_template/list');
  return response;
};

export const currentUser = async () => {
  const res = await axios.get('/api/user/current');
  return res;
};

export const userSuggestion = async options => {
  const res = await axios.get('api/user/suggestion', {
    params: { ...options },
  });
  return res;
};

export const hashtagListing = async options => {
  const res = await axios.get('/api/content/hashtags', {
    params: { ...options },
  });
  return res;
};

export const videoListing = async options => {
  const res = await axios.get('/api/mediamanager/video/list', {
    params: { ...options },
  });
  return res;
};

export const externalSource = async options => {
  const res = await axios.get('api/file/externalSource', {
    params: { ...options },
  });
  return res;
};

export const uploadFile = async (data, config = {}) => {
  const res = await axios.post('api/mediamanager/upload-file', data, config);
  return res;
};

export const saveVideoFileStack = async data => {
  const res = await axios.post('/api/mediamanager/video', data);
  return res;
};

export const oEmbed = async options => {
  const res = await axios.get('https://api.embedly.com/1/oembed', {
    params: { ...options },
  });
  return res;
};

export const fileDetails = async options => {
  const res = await axios.get('api/mediamanager/list', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return res;
};

export const editFileDetails = async data => {
  const res = await axios.post('api/mediamanager/edit', data);
  return res;
};

export const quickPost = async data => {
  const response = await axios.post('/api/content/quickpost', data);
  return normalize(response.data, feedSchema);
};

export const cropImage = async data => {
  const res = await axios.post('api/mediamanager/cropImage', data);
  return res;
};

export const templateType = async () => {
  const res = await axios.get('/api/templateType/list');
  return res;
};

export const faq = async data => {
  const response = await axios.post('/api/content/faq', data);
  return normalize(response.data, feedSchema);
};

export const share = async data => {
  const res = await axios.post('/api/content/share', data);
  return res;
};

export const privateMessage = async data => {
  const res = await axios.post('/api/user/quickpost/share', data);
  return res;
};

export const userList = async options => {
  const res = await axios.get('/api/user/list', {
    params: { ...options },
  });
  return res;
};

export const userLiked = async options => {
  const response = await axios.get('api/like', {
    params: { ...options },
  });
  return normalize(response.data, [userSchema]);
};

export const directoryPrivateMessage = async data => {
  const response = await axios.post('api/user/quickpost/create', data);
  return response;
};

export const externalSites = async () => {
  const response = await axios.get('api/search/externalSites');
  return response;
};

export const search = async options => {
  const response = await axios.get('api/search', {
    params: { ...options },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  const memberEntities = normalize(response.data.members, [userSchema]);
  const communityEntities = normalize(response.data.communities, [
    communitySchema,
  ]);
  const contentEntities = normalize(response.data.contents, [feedSchema]);
  return {
    entities: merge(
      contentEntities.entities,
      communityEntities.entities,
      memberEntities.entities,
    ),
    data: {
      ...response.data,
      contents: contentEntities.result,
      communities: communityEntities.result,
      members: memberEntities.result,
    },
  };
};

export const communityFiles = async (options, cancelToken) => {
  const response = await axios.get('api/search/community-file', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
    cancelToken,
  });
  return response;
};

export const quickSharingOfTheLink = async options => {
  const response = await axios.post(
    'api/content/quick-sharing-of-the-link',
    options,
  );
  return normalize(response.data, feedSchema);
};

export const digitalWorkplaceList = async () => {
  const response = await axios.get('api/digital-workplace/list');
  return response;
};

export const transferDocument = async data => {
  const response = await axios.post('api/transfer-document', data);
  return response;
};
