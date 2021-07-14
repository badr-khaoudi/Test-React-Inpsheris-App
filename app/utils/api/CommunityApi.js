import axios from 'axios';
import qs from 'qs';
import { normalize } from 'normalizr';
import { feedSchema, communitySchema } from 'utils/normalizrSchema/feed';
import MicrosoftGraphApi from './MicrosoftGraphApi';
import API from './BaseApi';

export const communityList = async (options, cancelToken) => {
  const response = await axios.get('/api/community/list', {
    params: {
      ...options,
    },
    cancelToken,
  });
  return normalize(response.data, [communitySchema]);
};

export const communityTab = async options => {
  const response = await axios.get('/api/content/community-tab', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return normalize(response.data.contents, [feedSchema]);
};

export const communityOtherTab = async options => {
  const response = await axios.get('/api/content/community-tab', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return response;
};

export const communityGroupList = async (options, cancelToken) => {
  const response = await axios.get('/api/communityGroup/list', {
    params: options,
    cancelToken,
  });
  return response;
};

export const userCommunity = async options => {
  const response = await axios.get('api/user/community', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return response;
};

export const community = async options => {
  const response = await axios.get('api/community', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, communitySchema);
};

export const like = async options => {
  const response = await axios.post('api/like/community', {
    ...options,
  });
  return response;
};

export const deleteLike = async options => {
  const response = await axios.delete('api/like/community', {
    params: {
      ...options,
    },
  });
  return response;
};

export const follow = async options => {
  const response = await axios.post('api/community/follow', {
    ...options,
  });
  return response;
};

export const communityHomeTab = async options => {
  const response = await axios.get('api/content/list', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return normalize(response.data.contents, [feedSchema]);
};

export const pinOnCommunity = async options => {
  const response = await axios.get('api/content/pin-on-community', {
    params: {
      ...options,
    },
  });
  return normalize(response.data.contents, [feedSchema]);
};

export const communityFileSearch = async options => {
  const response = await axios.get('api/community/file/search', {
    params: {
      ...options,
    },
    paramsSerializer: params => qs.stringify(params, { indices: false }),
  });
  return response;
};

export const documentTreeList = async options => {
  const response = await axios.get('api/community/document/tree/list', {
    params: {
      ...options,
    },
  });
  return response;
};

export const newDocument = async options => {
  const response = await axios.post('api/community/document/tree', {
    ...options,
  });
  return response;
};

export const renameFolder = async (params, options) => {
  const response = await API.put(
    'community/document/tree/folder/rename',
    {
      ...options,
    },
    {
      params: {
        ...params,
      },
    },
  );
  return response;
};

export const deleteDocument = async options => {
  const response = await axios.delete('api/community/document/tree', {
    params: {
      ...options,
    },
  });
  return response;
};

export const orderDocument = async options => {
  const response = await API.post('community/document/tree/order', {
    ...options,
  });
  return response;
};

export const faqSearch = async options => {
  const response = await axios.get('api/community/faq/search', {
    params: {
      ...options,
    },
  });
  return normalize(response.data.contents, [feedSchema]);
};

export const requestedCommunity = async options => {
  const response = await axios.post('api/requestedCommunity', {
    ...options,
  });
  return response;
};

export const tabTypeList = async () => {
  const response = await axios.get('api/tabtype/list');
  return response;
};

export const createCommunity = async options => {
  const response = await axios.post('api/community/create', options);
  return normalize(response.data, communitySchema);
};

export const deleteTab = async options => {
  const response = await API.delete('community/tab', {
    params: options,
  });
  return response;
};

export const changeImage = async (params, options) => {
  const response = await axios.put('api/community/change-image', options, {
    params,
  });
  return response;
};

export const hasContent = async options => {
  const response = await axios.get('api/community/tab/has-content', {
    params: options,
  });
  return response;
};

export const joinedTeams = async () => {
  const microsoftGraphApi = await MicrosoftGraphApi(['Team.ReadBasic.All']);
  const response = await microsoftGraphApi.get('v1.0/me/joinedTeams');
  return response;
};

export const listChannels = async teamId => {
  const microsoftGraphApi = await MicrosoftGraphApi(['Channel.ReadBasic.All']);
  const response = await microsoftGraphApi.get(`v1.0/teams/${teamId}/channels`);
  return response;
};

export const filesFolder = async (teamId, channelId) => {
  const microsoftGraphApi = await MicrosoftGraphApi(['Files.Read.All']);
  const response = await microsoftGraphApi.get(
    `v1.0/teams/${teamId}/channels/${channelId}/filesFolder`,
  );
  return response;
};

// Search for a DriveItems within a drive
export const searchDriveItems = async (
  driveId,
  searchText,
  options,
  cancelToken,
) => {
  const microsoftGraphApi = await MicrosoftGraphApi([
    'Files.Read.All',
    'Sites.Read.All',
  ]);
  const response = await microsoftGraphApi.get(
    `v1.0/me/drives/${driveId}/root/search(q='${searchText}')`,
    {
      params: options,
      cancelToken,
    },
  );
  return response;
};

export const searchChildrenDriveItem = async (
  driveId,
  itemId,
  searchText,
  options,
  cancelToken,
) => {
  const microsoftGraphApi = await MicrosoftGraphApi([
    'Files.Read.All',
    'Sites.Read.All',
  ]);
  const response = await microsoftGraphApi.get(
    `v1.0/me/drives/${driveId}/items/${itemId}/search(q='${searchText}')`,
    {
      params: options,
      cancelToken,
    },
  );
  return response;
};
