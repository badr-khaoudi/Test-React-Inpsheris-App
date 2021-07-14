import axios from 'axios';

export const UsefulLinksBase = async options => {
  const res = await axios.get('/api/usefulLink/list', {
    params: {
      ...options,
    },
  });
  return res;
};

export const usefulLinks = () => UsefulLinksBase({ footer: false });

export const applicationLinks = () =>
  UsefulLinksBase({ footer: false, type: 'Application' });
