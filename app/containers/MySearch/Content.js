import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import { ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import {
  makeSelectFeed,
  makeSelectUser,
  makeSelectCommunity,
} from 'containers/GlobalEntities/selectors';
import CommunityAvatar from 'components/CommunityAvatar';
import UserAvatar from 'components/UserAvatar';
import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import { createMarkup } from 'utils/helpers/createMarkup';

const Content = ({ content }) => {
  const history = useHistory();
  const location = useLocation();
  const contentDetails = useSelector(makeSelectFeed(content));
  const author = useSelector(makeSelectUser(contentDetails.author));
  const community = useSelector(makeSelectCommunity(contentDetails.community));
  const uid = useMemo(() => contentDetails.sourceId || contentDetails.uid, [
    contentDetails,
  ]);
  const userUid = useMemo(
    () => contentDetails.lastActivityUser || contentDetails.author,
    [contentDetails],
  );
  const feedModalPath = useFeedModalPath(
    contentDetails.community,
    contentDetails.communityTab,
    uid,
    'viewdetail',
    'home',
  );
  return (
    <ListItem
      button
      alignItems="flex-start"
      onClick={() => {
        history.push({
          pathname: feedModalPath,
          state: { background: location },
        });
      }}
    >
      <ListItemAvatar style={{ marginTop: 8, marginRight: 20 }}>
        {contentDetails.community ? (
          <CommunityAvatar communityUid={contentDetails.community} />
        ) : (
          <UserAvatar userUid={userUid} variant="Avatar" />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            dangerouslySetInnerHTML={createMarkup(contentDetails.parseText)}
          />
        }
        secondary={
          <>
            <Typography variant="body1" component="span" display="block">
              {moment(contentDetails.publicationStartDate).format(
                'DD MMM YYYY',
              )}
            </Typography>
            <Typography component="span">
              {author && (
                <Link
                  onClick={e => e.stopPropagation()}
                  to={`/myprofile/${author.uid}/About`}
                >
                  {`${author.firstName} ${author.lastName}`}
                </Link>
              )}
              {` in `}
              {community && (
                <Link
                  onClick={e => e.stopPropagation()}
                  to={`/community/${encodeURIComponent(community.label)}/${
                    community.uid
                  }`}
                >
                  {community.label}
                </Link>
              )}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

Content.propTypes = {
  content: PropTypes.string,
};

export default memo(Content);
