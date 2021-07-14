import axios from 'axios';
import { normalize } from 'normalizr';
import { widgetSchema } from 'utils/normalizrSchema/widget';

export const widget = async options => {
  const response = await axios.get('/api/widget/all', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, [widgetSchema]);
};

export const deleteWidget = async options => {
  const response = await axios.delete('api/widget', {
    params: {
      ...options,
    },
  });
  return response;
};

export const displayOptions = async () => {
  const response = await axios.get('api/widget/display-options');
  return response;
};

export const widgetTypes = async () => {
  const response = await axios.get('api/widget/types');
  return response;
};

export const socialWallTypes = async () => {
  const response = await axios.get('api/widget/social-wall/types');
  return response;
};

export const typeformList = async options => {
  const response = await axios.get('api/typeform/list', {
    params: {
      ...options,
    },
  });
  return response;
};

export const widgetItem = async options => {
  const response = await axios.get('api/widget', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, widgetSchema);
};

export const createWidget = async options => {
  const response = await axios.post('api/widget/create', {
    ...options,
  });
  return normalize(response.data, widgetSchema);
};

export const surveySummary = async options => {
  const response = await axios.post('api/survey/summary', options, {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  });
  return response;
};
