/**
 *
 * CommentsP2V8
 *
 */

import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import RoundButton from 'utils/helpers/roundButton';
import CommentP2V8 from 'components/CommentP2V8/Loadable';
import CommentFormP2V8 from 'containers/CommentFormP2V8/Loadable';
import { makeSelectCommentsPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { comments } from './actions';

export function CommentsP2V8(props) {
  useInjectReducer({ key: 'commentsP2V8', reducer });
  useInjectSaga({ key: 'commentsP2V8', saga });

  const {
    contentUid,
    followerQuickpostUid,
    feed,
    currentUser,
    dispatchComments,
    commentsPage,
  } = props;

  useEffect(() => {
    if (_.isEmpty(feed.comments)) {
      dispatchComments({
        content: contentUid,
        followerQuickpostUid,
        lastTwoComments: true,
      });
    }
  }, []);

  const handleLoadMore = () => {
    dispatchComments({
      content: contentUid,
      followerQuickpostUid,
      page: commentsPage,
    });
  };

  const [canModify, setCanModify] = useState(false);

  useEffect(() => {
    if (currentUser.role === 'GlobalCommunityManager') {
      setCanModify(true);
    } else if (currentUser.communityRoles) {
      if (
        !_.isEmpty(
          _.find(currentUser.communityRoles, {
            communityUid: feed.community || feed.sharedCommunity,
          }),
        )
      ) {
        setCanModify(true);
      }
    }
  }, [currentUser]);

  const isFAQquestion = useMemo(() => {
    if (
      feed.type === 'FAQquestion' ||
      (feed.type === 'share' &&
        _.find(feed.blocks, { type: 'reference' }).refType === 'FAQquestion')
    ) {
      return true;
    }
    return false;
  }, [feed.type, feed.blocks]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CommentFormP2V8
            content={contentUid}
            followerQuickpostUid={followerQuickpostUid}
          />
        </Grid>
        {!_.isEmpty(feed.comments) &&
          _.map(feed.comments, comment => (
            <Grid item xs={12} key={comment}>
              <CommentP2V8
                commentUid={comment}
                isFAQquestion={isFAQquestion}
                canModify={canModify}
                author={feed.author}
                content={contentUid || followerQuickpostUid}
              />
            </Grid>
          ))}
        {_.size(feed.comments) < feed.commentCount && (
          <Grid item xs={12}>
            <RoundButton variant="outlined" onClick={handleLoadMore}>
              Load More
            </RoundButton>
          </Grid>
        )}
      </Grid>
    </>
  );
}

CommentsP2V8.propTypes = {
  contentUid: PropTypes.string,
  followerQuickpostUid: PropTypes.string,
  feed: PropTypes.object,
  currentUser: PropTypes.object,
  dispatchComments: PropTypes.func,
  commentsPage: PropTypes.number,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    feed: makeSelectFeed(props.contentUid || props.followerQuickpostUid),
    currentUser: makeSelectCurrentUser(),
    commentsPage: makeSelectCommentsPage(
      props.contentUid || props.followerQuickpostUid,
    ),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchComments: options => dispatch(comments(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommentsP2V8);
