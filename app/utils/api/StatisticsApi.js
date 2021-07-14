import axios from 'axios';

export const lastUpdatedDate = async () => {
  const response = await axios.get('api/stat/get-last-updated-date');
  return response;
};

export const exportAll = async options => {
  const response = await axios.post('api/stat/export/all', {
    ...options,
  });
  return response;
};

export const exportTable = async options => {
  const response = await axios.post('api/stat/export', {
    ...options,
  });
  return response;
};

export const viewDetailsExport = async options => {
  const response = await axios.post(
    'api/stat/list-user-details-and-actions/user/view-details/export',
    {
      ...options,
    },
  );
  return response;
};

export const jobList = async () => {
  const response = await axios.get('api/job/list');
  return response;
};

export const downloadFile = async params => {
  const response = await axios.get('api/mediamanager', {
    params,
    responseType: 'blob',
  });
  return response;
};

export const countTotal = async (params, cancelToken) => {
  const response = await axios.get('api/stat/global-connection/count-total', {
    params,
    cancelToken,
  });
  return response;
};

export const countTotalTable = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/global-connection/table/count-total',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countByDepartment = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/global-connection/count-by-department',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countByStatus = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/global-connection/count-by-status',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countByCommunityStatus = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/global-connection/count-by-community-status',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countCommunityMemberConnection = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/count-community-member-connection',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countContentCreatedByDate = async (params, cancelToken) => {
  const response = await axios.get('api/stat/count-content-created-by-date', {
    params,
    cancelToken,
  });
  return response;
};

export const countContentCreatedByCommunity = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/count-content-created-by-community',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const countContentCreatedByCommunityTable = async (
  params,
  cancelToken,
) => {
  const response = await axios.get(
    'api/stat/count-content-created-by-community/table',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const analyzeContentViewedByCommunity = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/analyze-content-viewed-by-community',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const analyzeContentViewedByCommunityTable = async (
  params,
  cancelToken,
) => {
  const response = await axios.get(
    'api/stat/analyze-content-viewed-by-community/table',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const viewActivityCommunity = async (params, cancelToken) => {
  const response = await axios.get('api/stat/view-activity-community', {
    params,
    cancelToken,
  });
  return response;
};

export const listContentViewedBySource = async (params, cancelToken) => {
  const response = await axios.get('api/stat/list-content-viewed-by-source', {
    params,
    cancelToken,
  });
  return response;
};

export const listCommentLike = async (params, cancelToken) => {
  const response = await axios.get('api/stat/list-comment-like', {
    params,
    cancelToken,
  });
  return response;
};

export const listUserDetailsAndActions = async (params, cancelToken) => {
  const response = await axios.get('api/stat/list-user-details-and-actions', {
    params,
    cancelToken,
  });
  return response;
};

export const totalConnectAtTheMoment = async (params, cancelToken) => {
  const response = await axios.get('api/stat/total-connect-at-the-moment', {
    params,
    cancelToken,
  });
  return response;
};

export const viewDetails = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/list-user-details-and-actions/user/view-details',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const listUserNeverConnect = async (params, cancelToken) => {
  const response = await axios.get('api/stat/list-user-never-connect', {
    params,
    cancelToken,
  });
  return response;
};

export const listUserConnect = async (params, cancelToken) => {
  const response = await axios.get('api/stat/list-user-connect', {
    params,
    cancelToken,
  });
  return response;
};

export const listUserConnectLessEqualTenTimes = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/list-user-connect-less-equal-10-times',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const listUserConnectionSummary = async (params, cancelToken) => {
  const response = await axios.get(
    'api/stat/global-connection/list-user-connection-summary',
    {
      params,
      cancelToken,
    },
  );
  return response;
};

export const viewActivityWidgetVideo = async (params, cancelToken) => {
  const response = await axios.get('api/stat/view-activity-widget-video', {
    params,
    cancelToken,
  });
  return response;
};

export const flexdesk = async (params, cancelToken) => {
  const response = await axios.get('api/stat/flexdesk', {
    params,
    cancelToken,
  });
  return response;
};
