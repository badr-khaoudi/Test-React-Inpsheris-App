/**
 *
 * Tests for LivelyHeader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent, screen } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { ConnectedRouter } from 'connected-react-router';
import { browserHistory } from 'react-router-dom';
import history from '../../../utils/history';

import { MockTheme } from '../../../../internals/mocks/materialUiTheme';
import LivelyHeader from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

import configureStore from '../../../configureStore';

const store = configureStore({}, browserHistory);
// const testUser = {
//   readOnly: false,
//   contentCreation: true,
// };

const renderComponent = () => (
  <Provider store={store}>
    <IntlProvider locale={DEFAULT_LOCALE}>
      <ConnectedRouter history={history}>
        <MockTheme>
          <LivelyHeader
            languageTranslationControl={{ value: true }}
            documentBar={{ value: true }}
            microsoftIntegration={{ value: true }}
            allowChangePassword={{ value: true }}
            quickSharingOfLinkLikeQuickpost={{ value: true }}
            alertModule={{ value: true }}
            noteTheService={{ value: true }}
            notificationCount={2}
          />
        </MockTheme>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>
);

describe('<LivelyHeader />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(renderComponent());
    expect(spy).not.toHaveBeenCalled();
  });

  it('rightMenuItem should open dropdown on click', () => {
    const { getByTestId, debug } = render(renderComponent());

    debug();

    fireEvent.click(getByTestId('content-creation-toggle'));

    expect(screen.getByTestId('content-creation-dropdown')).not.ToBeNull();
    // const rightMenuItem = wrapper.find(LivelyRightMenuItem);
    // rightMenuItem.simulate('click');

    // expect(rightMenuItem.prop('aria-controls')).toEqual('menu-list-grow');
  });
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(renderComponent());

    expect(firstChild).toMatchSnapshot();
  });
});
