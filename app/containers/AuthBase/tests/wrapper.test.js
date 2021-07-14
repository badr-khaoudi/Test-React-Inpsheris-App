import React from 'react';
import { render } from 'react-testing-library';
import Wrapper from '../wrapper';
import { MockTheme } from '../../../../internals/mocks/materialUiTheme';

describe('Wrapper', () => {
  const { LivelyContainer, LivelyLoadingState, Layout } = Wrapper;

  it('should render a <LivelyContainer> component', () => {
    const {
      container: { firstChild },
    } = render(
      <MockTheme>
        <LivelyContainer>
          <>Jester Tester</>
        </LivelyContainer>
      </MockTheme>,
    );

    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should render a <LivelyLoadingState> component', () => {
    const {
      container: { firstChild },
    } = render(<LivelyLoadingState />);

    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should render a <Layout> component', () => {
    const {
      container: { firstChild },
    } = render(<Layout />);

    expect(firstChild.tagName).toEqual('DIV');
  });
});
