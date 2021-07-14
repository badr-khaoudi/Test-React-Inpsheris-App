/**
 *
 * SplashScreen
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import logo from 'images/logo.png';

function SplashScreen() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="Lively" />
      <CircularProgress />
    </div>
  );
}

SplashScreen.propTypes = {};

export default memo(SplashScreen);
