/**
 *
 * Tests for AuthBase
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';
import { DEFAULT_LOCALE } from '../../../i18n';

import { AuthBase, mapDispatchToProps } from '../index';
import {
  getLanguage,
  getConfig,
  checkSession,
  getCurrentUser,
} from '../actions';

describe('<AuthBase />', () => {
  const dispatch = jest.fn();
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  // describe('CommunityModal', () => {
  //   it('should render null by default', () => {
  //     const {
  //       container: { firstChild },
  //     } = render(
  //       <Provider store={store}>
  //         <IntlProvider locale={DEFAULT_LOCALE}>
  //           <CommunityModal />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //     expect(firstChild).toMatchSnapshot();
  //   });

  //   it('should render CommunityModal after waiting for it to load', async () => {
  //     const {
  //       container: { firstChild },
  //     } = render(
  //       <Provider store={store}>
  //         <IntlProvider locale={DEFAULT_LOCALE}>
  //           <CommunityModal />
  //         </IntlProvider>
  //       </Provider>,
  //     );
  //     await CommunityModal;
  //     expect(firstChild).toMatchSnapshot();
  //   });
  // });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ConnectedRouter history={history}>
            <AuthBase
              dispatch={dispatch}
              dispatchGetLanguage={jest.fn()}
              dispatchCheckSession={jest.fn()}
              dispatchGetConfig={jest.fn()}
              navbarConfigsLoading
              dispatchGetCurrentUser={jest.fn()}
              navbarConfigsError={{ name: 'Error' }}
              microsoftIntegration={{ value: true }}
              dispatchGetFooterLinks={jest.fn()}
              currentUserLoading
              currentUser={{}}
              currentUserError={{}}
              footerLinks={[
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
              ]}
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expects to render LivelyLoadingState if navbarConfigsLoading or currentUserLoading are true', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ConnectedRouter history={history}>
            <AuthBase
              dispatch={dispatch}
              dispatchGetLanguage={jest.fn()}
              dispatchCheckSession={jest.fn()}
              dispatchGetConfig={jest.fn()}
              navbarConfigsLoading
              dispatchGetCurrentUser={jest.fn()}
              navbarConfigsError={{}}
              microsoftIntegration={{ value: true }}
              dispatchGetFooterLinks={jest.fn()}
              currentUserLoading
              currentUser={{}}
              currentUserError={{}}
              footerLinks={[
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
              ]}
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

    expect(queryByTestId('lively-loading-state')).not.toBe(null);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ConnectedRouter history={history}>
            <AuthBase
              dispatch={dispatch}
              dispatchGetLanguage={jest.fn()}
              dispatchCheckSession={jest.fn()}
              dispatchGetConfig={jest.fn()}
              navbarConfigsLoading
              dispatchGetFooterLinks={jest.fn()}
              navbarConfigsError={{ name: 'Error' }}
              dispatchGetCurrentUser={jest.fn()}
              microsoftIntegration={{ value: true }}
              currentUserLoading
              currentUser={{}}
              currentUserError={{}}
              footerLinks={[
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
              ]}
            />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchGetLanguage', () => {
      it('Should be injected and dispatch getLanguage', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchGetLanguage).toBeDefined();
        result.dispatchGetLanguage();
        expect(dispatch).toHaveBeenCalledWith(getLanguage());
      });
    });

    describe('dispatchGetConfig', () => {
      it('Should be injected and dispatch getConfig', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchGetConfig).toBeDefined();
        result.dispatchGetConfig();
        expect(dispatch).toHaveBeenCalledWith(getConfig());
      });
    });

    describe('dispatchCheckSession', () => {
      it('Should be injected and dispatch checkSession', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchCheckSession).toBeDefined();
        result.dispatchCheckSession();
        expect(dispatch).toHaveBeenCalledWith(checkSession());
      });
    });

    describe('dispatchGetCurrentUser', () => {
      it('Should be injected and dispatch getCurrentUser', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchGetCurrentUser).toBeDefined();
        result.dispatchGetCurrentUser();
        expect(dispatch).toHaveBeenCalledWith(getCurrentUser());
      });
    });
  });
});
