import axios from 'axios';
import { normalize } from 'normalizr';
import { feedSchema } from 'utils/normalizrSchema/feed';

export const event = async data => {
  const response = await axios.post('api/content/event', data);
  return normalize(response.data, feedSchema);
};

export const article = async data => {
  const response = await axios.post('api/content/article', data);
  return normalize(response.data, feedSchema);
};

export const grandArticle = async data => {
  const response = await axios.post('api/content/grand-article', data);
  return normalize(response.data, feedSchema);
};

export const imageGallery = async data => {
  const response = await axios.post('api/content/imageGallery', data);
  return normalize(response.data, feedSchema);
};

export const document = async data => {
  const response = await axios.post('api/content/document', data);
  return normalize(response.data, feedSchema);
};
