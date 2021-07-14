import axios from 'axios';

export const notificationCount = async () => {
  const res = await axios.get('api/notification/count');
  return res;
};

export const notificationList = async options => {
  const res = await axios.get('api/notification/list', {
    params: {
      ...options,
    },
  });
  return res;
};

export const participant = async options => {
  const res = await axios.get('api/interactive/participant', {
    params: {
      ...options,
    },
  });
  return res;
};

export const visitor = async options => {
  const res = await axios.get('api/interactive/visitor', {
    params: {
      ...options,
    },
  });
  return res;
};
