/**
 *
 * LatestPost
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { useHistory, useLocation } from 'react-router-dom';
import { List, ListItemText, Typography, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

function LatestPost({ latestPostData }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <List>
      {_.map(latestPostData.contents, (content, index) => (
        <React.Fragment key={content.uid}>
          <ListItem
            button
            onClick={() => {
              history.push({
                pathname: `/community/${encodeURIComponent(
                  content.communityName,
                )}/null/null/${content.uid}/viewdetail/home`,
                state: { background: location },
              });
            }}
          >
            <ListItemText
              primary={
                <Chip
                  size="small"
                  label={moment(content.publicationStartDate).fromNow()}
                />
              }
              secondary={<Typography variant="h6">{content.title}</Typography>}
            />
          </ListItem>
          {index + 1 !== _.size(latestPostData.contents) && (
            <Divider component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

LatestPost.propTypes = {
  latestPostData: PropTypes.object,
};

export default memo(LatestPost);
