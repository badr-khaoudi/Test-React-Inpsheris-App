import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'jest-styled-components';
import { MockTheme } from '../../../../internals/mocks/materialUiTheme';
import history from '../../../utils/history';
import {
  LivelyRightMenuItem,
  LivelyNavLink,
  LivelyDropLink,
  LivelyMobileNavLink,
} from '../wrapper';
import configureStore from '../../../configureStore';

const store = configureStore({}, history);

describe('Wrapper', () => {
  it('should render a <LivelyRightMenuItem> component', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockTheme>
              <LivelyRightMenuItem />
            </MockTheme>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('max-width', '30px');
  });

  it('should render a <LivelyNavLink> component', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockTheme>
              <LivelyNavLink to="/" />
            </MockTheme>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-bottom', '5px solid transparent');
  });

  it('should render a <LivelyDropLink> component', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockTheme>
              <LivelyDropLink to="/" />
            </MockTheme>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render a <LivelyMobileNavLink> component', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <MockTheme>
              <LivelyMobileNavLink to="/" />
            </MockTheme>
          </ConnectedRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('border-top-right-radius', '5px');
    expect(tree).toHaveStyleRule('border-bottom-right-radius', '5px');
  });
});
