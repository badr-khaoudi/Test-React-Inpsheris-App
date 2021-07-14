import {
  getFooterLinks,
  getFooterLinksSuccess,
  getFooterLinksError,
} from '../actions';

import {
  GET_FOOTER_LINKS,
  GET_FOOTER_LINKS_SUCCESS,
  GET_FOOTER_LINKS_ERROR,
} from '../constants';

describe('Footer actions', () => {
  describe('getFooterLinks', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_FOOTER_LINKS,
      };

      expect(getFooterLinks()).toEqual(expectedResult);
    });
  });

  describe('getFooterLinksSuccess', () => {
    it('should return the correct type and the passed data', () => {
      const fixture = [
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

      const expectedResult = {
        type: GET_FOOTER_LINKS_SUCCESS,
        data: fixture,
      };

      expect(getFooterLinksSuccess(fixture)).toEqual(expectedResult);
    });
  });

  describe('getFooterLinksError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: GET_FOOTER_LINKS_ERROR,
        error: fixture,
      };

      expect(getFooterLinksError(fixture)).toEqual(expectedResult);
    });
  });
});
