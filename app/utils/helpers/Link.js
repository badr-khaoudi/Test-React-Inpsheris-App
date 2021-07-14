import React from 'react';
import { Link } from 'react-router-dom';
import { Link as MaterialLink } from '@material-ui/core';

export default React.forwardRef((props, ref) => (
  <MaterialLink component={Link} {...props} ref={ref} />
));
