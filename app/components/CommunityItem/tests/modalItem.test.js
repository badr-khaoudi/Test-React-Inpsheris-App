/**
 *
 * Tests for CommunityModalItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CommunityModalItem from '../modalItem';
import { DEFAULT_LOCALE } from '../../../i18n';

const yammerCommunity = {
  id: 248,
  uid: '42b6e8b4-3ecf-461b-965f-d6debf9c5f19',
  label: 'All Company',
  description: 'This is the default group for everyone in the network',
  canEdit: true,
  communityType: 'Yammer',
  group: {
    uid: '78a0c243-5a07-4cbf-9011-0e9312395f77',
  },
  isYammerCommunity: true,
};

const livelyCommunity = {
  id: 229,
  uid: 'cbed5a83-a773-40a1-b5f5-e2d50966bf64',
  label: 'Comptabilité',
  canEdit: true,
  communityType: 'Regular',
  group: {
    uid: 'dda2b2ef-4d8c-4494-845e-e1da4d685122',
  },
  thumbLogoUrl:
    '/api/mediamanager?file=attachments/3cad7bd8-fa25-448e-a317-1eb1c0f2fdd5/Screenshot+2019-05-14+at+21.34.18_128x96.png',
  isYammerCommunity: false,
};

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale={DEFAULT_LOCALE}>
      <CommunityModalItem {...props} />
    </IntlProvider>,
  );

describe('<CommunityModalItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent({ community: yammerCommunity });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render LivelyCommunityModalItem and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent({ community: livelyCommunity });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render YammerCommunityModalItem and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent({ community: yammerCommunity });
    expect(firstChild).toMatchSnapshot();
  });
});
