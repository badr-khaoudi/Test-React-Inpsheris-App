import React from 'react';
import { Typography } from '@material-ui/core';

const TypographyPrimary = React.forwardRef((props, ref) => (
  <Typography color="textPrimary" {...props} ref={ref} />
));

export default TypographyPrimary;
