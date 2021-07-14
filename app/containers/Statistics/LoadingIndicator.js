import React from 'react';
import { CircularProgress } from '@material-ui/core';

export const LoadingIndicator = () => (
  <div
    style={{
      display: 'flex',
      minHeight: 400,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress color="primary" />
  </div>
);
