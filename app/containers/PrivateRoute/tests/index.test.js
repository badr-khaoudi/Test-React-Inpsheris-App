/**
 *
 * Tests for PrivateRoute
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import { checkSession } from 'containers/AuthBase/actions';
import configureStore from '../../../configureStore';
import { DEFAULT_LOCALE } from '../../../i18n';
import { PrivateRoute, mapDispatchToProps } from '../index';

describe('<PrivateRoute />', () => {
  const dispatch = jest.fn();
  const store = configureStore({}, browserHistory);

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ConnectedRouter history={history}>
            <PrivateRoute dispatchCheckSession={jest.fn()} {...props} />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render component if sessionSuccess is true', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      sessionSuccess: true,
      component: () => <h1>Component</h1>,
    });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and display loading', () => {
    const { container } = renderComponent({ sessionSuccess: false });
    expect(container.querySelector('h1')).not.toBeNull();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchCheckSession', () => {
      it('Should be injected and dispatch checkSession', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchCheckSession).toBeDefined();
        result.dispatchCheckSession();
        expect(dispatch).toHaveBeenCalledWith(checkSession());
      });
    });
  });
});
