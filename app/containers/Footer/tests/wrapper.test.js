import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-testing-library';
import {
  LivelyFooterLink,
  LivelySocialIcon,
  // LivelyFooterContainer,
  LivelyUppercaseTypography,
} from '../wrapper';
import { MockTheme } from '../../../../internals/mocks/materialUiTheme';
describe('Wrapper', () => {
  MockTheme.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  it('should render a <LivelyFooterLink> component', () => {
    const {
      container: { firstChild },
    } = render(
      <MockTheme>
        <LivelyFooterLink> Jest Test </LivelyFooterLink>
      </MockTheme>,
    );

    expect(firstChild.tagName).toEqual('A');
  });

  it('should render a <LivelySocialIcon> component', () => {
    const {
      container: { firstChild },
    } = render(
      <MockTheme>
        <LivelySocialIcon> Social icon </LivelySocialIcon>
      </MockTheme>,
    );

    expect(firstChild.tagName).toEqual('A');
  });
  it('should render a <LivelyUppercaseTypography> component', () => {
    const {
      container: { firstChild },
    } = render(
      <MockTheme>
        <LivelyUppercaseTypography />
      </MockTheme>,
    );

    expect(firstChild.tagName).toEqual('P');
  });
});
