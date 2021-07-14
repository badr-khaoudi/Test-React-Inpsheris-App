import axios from 'axios';
import { normalize } from 'normalizr';
import { communityTabSchema } from 'utils/normalizrSchema/feed';
import MicrosoftGraphApi from './MicrosoftGraphApi';
const scopes = ['Files.Read.All', 'Sites.Read.All'];

export const latestOpens = async (options, cancelToken) => {
  const response = await axios.get('api/community/file/latest-opens/list', {
    params: options,
    cancelToken,
  });
  return response;
};

export const latestUpdates = async (options, cancelToken) => {
  const response = await axios.get('api/community/file/latest-updates/list', {
    params: options,
    cancelToken,
  });
  return response;
};

export const listTabs = async (options, cancelToken) => {
  const response = await axios.get('api/community/file/list-tabs', {
    params: options,
    cancelToken,
  });
  return normalize(response.data, [communityTabSchema]);
};

export const list = async (options, cancelToken) => {
  const response = await axios.get('api/community/file/tab/list', {
    params: options,
    cancelToken,
  });
  return response;
};

export const config = async options => {
  const response = await axios.get('api/config', {
    params: options,
  });
  return response;
};

export const externalSource = async options => {
  const response = await axios.get('api/file/externalSource/list', {
    params: options,
  });
  return response;
};

export const driveRecent = async (options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.get('v1.0/me/drive/recent', {
    params: options,
    cancelToken,
  });
  return response;
};

// List children in the root of the current user's drive
export const listChildrenRoot = async (options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.get('v1.0/me/drive/root/children', {
    params: options,
    cancelToken,
  });
  return response;
};

// List children of a DriveItem with a known ID
export const listChildrenDriveItem = async (
  driveId,
  itemId,
  options,
  cancelToken,
) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.get(
    `v1.0/me/drives/${driveId}/items/${itemId}/children`,
    {
      params: options,
      cancelToken,
    },
  );
  return response;
};

// Search for sites
export const sharePointSites = async (options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(['Sites.Read.All']);
  const response = await microsoftGraphApi.get('v1.0/sites', {
    params: options,
    cancelToken,
  });
  return response;
};

// List a site's drives
export const documentLibraries = async (siteId, options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.get(`v1.0/sites/${siteId}/drives`, {
    params: options,
    cancelToken,
  });
  return response;
};

// List items in the root of a specific drive
export const listItemsDrive = async (driveId, options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.get(
    `v1.0/me/drives/${driveId}/root/children`,
    {
      params: options,
      cancelToken,
    },
  );
  return response;
};

export const searchEntity = async (options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.post('beta/search/query', options, {
    cancelToken,
  });
  return response;
};

export const batch = async (options, cancelToken) => {
  const microsoftGraphApi = await MicrosoftGraphApi(scopes);
  const response = await microsoftGraphApi.post('v1.0/$batch', options, {
    cancelToken,
  });
  return response;
};
