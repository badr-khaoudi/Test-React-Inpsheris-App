import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
// import LivelyHeader from '..';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import Drawer from '../drawer';
// import LivelyRightMenuItem from '../wrapper';
import { MockTheme } from '../../../../internals/mocks/materialUiTheme';

const store = configureStore({}, browserHistory);

const renderComponent = () =>
  render(
    <Provider store={store}>
      <IntlProvider locale="en">
        <ConnectedRouter history={history}>
          <MockTheme>
            <Drawer
              dispatch={jest.fn()}
              documentBar={{ value: true }}
              languageTranslationControl={{ value: true }}
              mobileNavActive
              toggleDrawer={jest.fn()}
            >
              <>Jester Tester</>
            </Drawer>
          </MockTheme>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
  );
describe('Drawer', () => {
  it('should render a <Drawer> component', () => {
    const {
      container: { firstChild },
    } = renderComponent();

    expect(firstChild).toMatchSnapshot();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  // it('rightMenuItem should open dropdown on click', () => {
  //   const mockSetState = jest.fn();

  //   jest.mock('react', () => ({
  //     useState: initial => [initial, mockSetState],
  //   }));
  //   const {
  //     container: { firstChild },
  //     getByTestId,
  //     debug,
  //   } = render(
  //     <Provider store={store}>
  //       <IntlProvider locale="en">
  //         <LivelyHeader />
  //       </IntlProvider>
  //     </Provider>,
  //   );
  //   debug();

  //   fireEvent.click(getByTestId(''), { button: 1 });

  //   // const rightMenuItem = wrapper.find(LivelyRightMenuItem);
  //   // rightMenuItem.simulate('click');

  //   // expect(rightMenuItem.prop('aria-controls')).toEqual('menu-list-grow');
  // });
});
