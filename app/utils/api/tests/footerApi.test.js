import axios from 'axios';
import { FooterLinks } from '../FooterApi';

jest.mock('axios');

describe('footerLinks', () => {
  it('fetches data successfully', async () => {
    const mock = [
      {
        id: 35,
        uid: '499a10d1-08e3-43b9-b69c-18f2fcdd5db6',
        heading: 'Mieux connaitre Inspheris',
        links: [
          {
            uid: '8e095b96-2705-41f0-8c2e-6041b7a0b837',
            id: 77,
            title: 'Site Web',
            link: 'http://www.inspheris.com',
            footer: false,
            type: 'Footer',
          },
        ],
      },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(mock));
    await expect(FooterLinks()).resolves.toEqual(mock);
    expect(axios.get).toHaveBeenCalledWith('/api/usefulLink/list', {
      params: { footer: true },
    });
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(FooterLinks()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/usefulLink/list', {
      params: { footer: true },
    });
  });
});
