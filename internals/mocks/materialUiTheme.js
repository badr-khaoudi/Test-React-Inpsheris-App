import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';

import MuiTheme from '../../app/themes';

export const MockTheme = ({ children }) => (
  <MuiThemeProvider theme={MuiTheme}>
    <ThemeProvider theme={MuiTheme}>{children}</ThemeProvider>
  </MuiThemeProvider>
);

MockTheme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
