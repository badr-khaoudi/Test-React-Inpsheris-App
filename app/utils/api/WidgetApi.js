import axios from 'axios';

export const widgetOrder = async data => {
  const response = await axios.post('/api/widget/order', data);
  return response;
};

export const submitPollApi = async data => {
  const response = await axios.post('/api/survey/vote', data);
  return response;
};

export const rss = async options => {
  const response = await axios.get('https://api.rss2json.com/v1/api.json', {
    params: {
      api_key: 'xyqyakb12kyn5smxeona231pc7qj8ie6gsbzlqbo',
      ...options,
    },
  });
  return response;
};

export const calendar = async options => {
  const response = await axios.get('api/calendar', {
    params: {
      ...options,
    },
  });
  return response;
};

export const deleteAgenda = async options => {
  const response = await axios.delete('api/agenda', {
    params: {
      ...options,
    },
  });
  return response;
};

export const event = async (params, options) => {
  const response = await axios.put('api/calendar/event', options, {
    params: {
      ...params,
    },
  });
  return response;
};

export const deleteEvent = async options => {
  const response = await axios.delete('api/calendar/event', {
    params: {
      ...options,
    },
  });
  return response;
};
