import produce from 'immer';
import footerReducer from '../reducer';
import {
  getFooterLinks,
  getFooterLinksSuccess,
  getFooterLinksError,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('footerReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      footerLinks: [],
      getFooterLinksLoading: true,
      getFooterLinksSuccess: false,
      getFooterLinksError: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(footerReducer(state, getFooterLinks())).toEqual(expectedResult);
  });

  it('should handle the getFooterLinks action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.getFooterLinksLoading = true;
      draft.getFooterLinksSuccess = false;
      draft.getFooterLinksError = {};
    });

    expect(footerReducer(state, getFooterLinks())).toEqual(expectedResult);
  });

  it('should handle the getFooterLinksSuccess action correctly', () => {
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
    const expectedResult = produce(state, draft => {
      draft.footerLinks = fixture;
      draft.getFooterLinksLoading = false;
      draft.getFooterLinksSuccess = true;
    });

    expect(footerReducer(state, getFooterLinksSuccess(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the getFooterLinksSuccess action correctly', () => {
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
    const expectedResult = produce(state, draft => {
      draft.getFooterLinksLoading = false;
      draft.getFooterLinksSuccess = false;
      draft.getFooterLinksError = fixture;
    });

    expect(footerReducer(state, getFooterLinksError(fixture))).toEqual(
      expectedResult,
    );
  });
});
