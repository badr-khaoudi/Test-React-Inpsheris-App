import axios from 'axios';
import { normalize } from 'normalizr';
import { carouselSchema } from 'utils/normalizrSchema/carousel';

export const carousel = async options => {
  const response = await axios.get('api/carousel', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, carouselSchema);
};

export const carouselList = async options => {
  const response = await axios.get('api/carousel/all', {
    params: {
      ...options,
    },
  });
  return normalize(response.data, [carouselSchema]);
};

export const createCarousel = async options => {
  const response = await axios.post('api/carousel/create', {
    ...options,
  });
  return normalize(response.data, carouselSchema);
};

export const publishCarousel = async options => {
  const response = await axios.post('api/carousel/publish', {
    ...options,
  });
  return response;
};

export const deleteCarousel = async options => {
  const response = await axios.delete('api/carousel', {
    params: {
      ...options,
    },
  });
  return response;
};
