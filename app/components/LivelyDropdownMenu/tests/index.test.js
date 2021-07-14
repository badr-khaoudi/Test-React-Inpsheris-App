/**
 *
 * Tests for LivelyDropdownMenu
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from 'react-testing-library';

import MenuItem from '@material-ui/core/MenuItem';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import LivelyDropdownMenu from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const TestComponent = () => {
  const leftUsefulLinksRef = React.useRef(null);

  React.useEffect(() => {
    // console.log(leftUsefulLinksRef);
  }, []);

  return (
    <>
      <button id="test" ref={leftUsefulLinksRef} type="button">
        Test
      </button>
      <LivelyDropdownMenu
        anchorRef={leftUsefulLinksRef}
        open
        handleClose={() => jest.fn()}
      >
        <MenuItem>Jest Test</MenuItem>
      </LivelyDropdownMenu>
    </>
  );
};

describe('<LivelyDropdownMenu />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <TestComponent />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const ref = React.useRef(null);
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <button id="test" ref={ref} type="button">
          Test
        </button>
        <LivelyDropdownMenu anchorRef={ref} open handleClose={() => jest.fn()}>
          <MenuItem>Jest Test</MenuItem>
        </LivelyDropdownMenu>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
