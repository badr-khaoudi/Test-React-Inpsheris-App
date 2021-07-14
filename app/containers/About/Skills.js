import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Person } from '@material-ui/icons';
// import { makeSelectUser } from 'containers/MyProfile/selectors';

const Skills = ({ value }) => (
  <Card variant="outlined">
    <CardHeader
      avatar={
        <Avatar>
          <Person />
        </Avatar>
      }
      title={<Typography variant="h5">Skills</Typography>}
    />
    <CardContent>
      {value ||
        'Quel poste occupez-vous, dans quel service ou direction? Quelles sont vos principales missions?'}
    </CardContent>
  </Card>
);

Skills.propTypes = {
  value: PropTypes.string,
};

export default memo(Skills);
