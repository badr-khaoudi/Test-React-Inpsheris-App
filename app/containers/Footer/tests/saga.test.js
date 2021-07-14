import { takeLatest, put } from 'redux-saga/effects';
import { GET_FOOTER_LINKS } from '../constants';
import { getFooterLinksSuccess, getFooterLinksError } from '../actions';

import footerSaga, { getFooterLinks } from '../saga';

describe('footerSaga Saga', () => {
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  let getFooterLinksGenerator;

  const footer = footerSaga();
  beforeEach(() => {
    getFooterLinksGenerator = getFooterLinks();

    const footerLinksSelectDescriptor = getFooterLinksGenerator.next().value;
    expect(footerLinksSelectDescriptor).toMatchSnapshot();
  });

  it('should start task to watch for GET_FOOTER_LINKS action', () => {
    const takeLatestDescriptor = footer.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_FOOTER_LINKS, getFooterLinks),
    );
  });

  it('should dispatch the getFooterLinksSuccess action if it requests the data successfully', () => {
    const footerLinks = [
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
    const response = {
      data: footerLinks,
    };
    const putDescriptor = getFooterLinksGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getFooterLinksSuccess(footerLinks)));
  });

  it('should call the getFooterLinksError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getFooterLinksGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getFooterLinksError(response)));
  });
});
