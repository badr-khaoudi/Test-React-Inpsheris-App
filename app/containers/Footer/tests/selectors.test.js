import { makeSelectFooterLinks } from '../selectors';

describe('selectFooterDomain', () => {
  it('should select the footerLinks', () => {
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

    const mockedState = {
      footer: { footerLinks },
    };
    expect(makeSelectFooterLinks()(mockedState)).toEqual(footerLinks);
  });
});
