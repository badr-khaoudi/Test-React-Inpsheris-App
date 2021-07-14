/**
 *
 * Tests for Footer
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { MockTheme } from '../../../../internals/mocks/materialUiTheme';
import configureStore from '../../../configureStore';

import { mapDispatchToProps, Footer } from '../index';
import { getFooterLinks } from '../actions';

import { DEFAULT_LOCALE } from '../../../i18n';

describe('<Footer />', () => {
  const dispatch = jest.fn();
  const footerLinksMock = [
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
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  const renderFooter = () => (
    <Provider store={store}>
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MockTheme>
          <Footer
            dispatch={dispatch}
            dispatchGetFooterLinks={dispatch}
            footerLinks={footerLinksMock}
          />
        </MockTheme>
      </IntlProvider>
    </Provider>
  );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(renderFooter());
    expect(spy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchGetFooterLinks', () => {
      it('Should be injected and dispatch getFooterLinks', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchGetFooterLinks).toBeDefined();
        result.dispatchGetFooterLinks();
        expect(dispatch).toHaveBeenCalledWith(getFooterLinks());
      });
    });
  });

  /**
   * Snapshot testing
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(renderFooter());
    expect(firstChild).toMatchSnapshot();
  });
});
