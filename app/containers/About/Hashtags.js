import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { CardHeader, CardContent, Avatar, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';

const Hashtags = () => {
  const user = useSelector(makeSelectUser(useSelector(makeSelectUserUid())));
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar>#</Avatar>}
        title={<Typography variant="h5">Hashtags</Typography>}
      />
      <CardContent>
        {_.map(_.union(user.hobbyListing, user.hashTags), searchText => (
          <Chip
            key={searchText}
            label={searchText}
            clickable
            component={Link}
            to={`/search/general/all/global/${encodeURIComponent(
              searchText,
            )}/true/false/`}
            variant="outlined"
            style={{ marginRight: 5, marginBottom: 5 }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default memo(Hashtags);
