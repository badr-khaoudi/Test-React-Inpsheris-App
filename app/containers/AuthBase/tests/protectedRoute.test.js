import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';
import ProtectedRoute from '../protectedRoute';
import Community from '../../Community/Loadable';

describe('<ProtectedRoute />', () => {
  // const dispatch = jest.fn();
  const store = configureStore({}, browserHistory);

  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ProtectedRoute component={Community} hasAccess {...props} />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });
});
