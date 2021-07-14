/**
 *
 * Tests for CommunityItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import CommunityItem from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const community = {
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

describe('<CommunityItem />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CommunityItem community={community} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  // it('Expect to have additional unit tests specified', () => {
  //   expect(true).toEqual(false);
  // });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <CommunityItem community={community} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
