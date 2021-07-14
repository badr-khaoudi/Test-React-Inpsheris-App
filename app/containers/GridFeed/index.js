/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * GridFeed
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { CardContent, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
// import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import { createMarkup } from 'utils/helpers/createMarkup';
import UserAvatar from 'components/UserAvatar';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import ActionSentence from 'components/ActionSentence';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
// import makeSelectGridFeed from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ThumbnailText, SmallImage } from './Wrapper';
// import messages from './messages';

export function GridFeed(props) {
  useInjectReducer({ key: 'gridFeed', reducer });
  useInjectSaga({ key: 'gridFeed', saga });

  const { feed, referrer } = props;

  const userUid = useMemo(() => feed.lastActivityUser || feed.author, [feed]);
  const heading = _.find(feed.blocks, { type: 'heading' });
  const text = _.find(feed.blocks, { type: 'text' });
  const reference = _.find(feed.blocks, { type: 'reference' });

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      <Thumbnail
        thumbnail_url={
          heading && heading.imageGridviewThumb && !heading.smallImage
            ? heading.imageGridviewThumb
            : ''
        }
      >
        {heading && heading.imageGridviewThumb && heading.smallImage && (
          <SmallImage
            backgroundColor={heading.imageGridviewSmallThumbBackgroundColor}
          >
            <img src={heading.imageGridviewThumb} alt="" />
          </SmallImage>
        )}
        <ThumbnailText>
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={createMarkup(
              referrer === 'PrivateMessages'
                ? heading
                  ? heading.title
                  : text
                  ? text.title
                  : null
                : feed.parseText,
            )}
            gutterBottom
            noWrap
          />
          {heading && heading.subTitle && (
            <Typography variant="caption" display="block" noWrap>
              {heading.subTitle}
            </Typography>
          )}
        </ThumbnailText>
      </Thumbnail>
      <CardContent>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <UserAvatar userUid={userUid} variant="Avatar" size="sm" />
          </Grid>
          <Grid item xs>
            {feed.type !== 'jobOffer' && (
              <UserAvatar userUid={userUid} variant="DisplayName" size="sm" />
            )}
            <Typography variant="subtitle2" style={{ color: '#231F20' }}>
              <ActionSentence
                type={
                  feed.type === 'follower quickpost sharing' ||
                  feed.type === 'follower quickpost'
                    ? reference.refType
                    : feed.type
                }
                previousAction={feed.previousAction}
                lastAction={feed.previousAction}
                authorUid={
                  referrer === 'PrivateMessages'
                    ? feed.sharedContentAuthor
                    : feed.author
                }
                editionStatus={feed.editionStatus}
                blocks={feed.blocks}
                communityUid={
                  referrer === 'PrivateMessages'
                    ? feed.sharedCommunity
                    : feed.community
                }
              />
            </Typography>
            <Typography
              variant="caption"
              style={{ color: '#7C7C7C', fontWeight: 400 }}
            >
              {moment(feed.publicationStartDate).format(
                'DD MMM YYYY [|] HH:mm',
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

GridFeed.propTypes = {
  feed: PropTypes.object,
  referrer: PropTypes.string,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    feed: makeSelectFeed(props.uid),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GridFeed);
