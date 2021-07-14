import axios from 'axios';

export const participate = async options => {
  const response = await axios.post('api/event/participate', {
    ...options,
  });
  return response;
};

export const integrate = async options => {
  const response = await axios.post('api/event/integrate', {
    ...options,
  });
  return response;
};

export const cancelParticipation = async options => {
  const response = await axios.post('api/event/cancel-participation', {
    ...options,
  });
  return response;
};

export const exportParticipants = async options => {
  const response = await axios.post('api/event/participants/export', {
    ...options,
  });
  return response;
};

export const stopParticipation = async (params, options) => {
  const response = await axios.put('api/event/stop-participation', options, {
    params: {
      ...params,
    },
  });
  return response;
};

export const addParticipation = async options => {
  const response = await axios.post('api/event/add-participation', {
    ...options,
  });
  return response;
};

export const participants = async options => {
  const response = await axios.get('api/event/participants', {
    params: { ...options },
  });
  return response;
};
