/**
 *
 * LikedArticles
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardHeader, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import GridFeed from 'containers/GridFeed';
import { makeSelectUserLikedList } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  userLikedList as userLikedListAction,
  userLikedListMore,
} from './actions';

SwiperCore.use([Navigation, Virtual]);

export function LikedArticles(props) {
  useInjectReducer({ key: 'likedArticles', reducer });
  useInjectSaga({ key: 'likedArticles', saga });

  const {
    userUid,
    dispatchUserLikedList,
    dispatchUserLikedListMore,
    userLikedList,
  } = props;

  const pageRef = useRef(1);
  const [page, setPage] = useState(1);
  const handleReachEnd = () => {
    pageRef.current += 1;
    setPage(pageRef.current);
  };

  useEffectAfterMount(() => {
    if (page > 1 && (page - 1) * 4 < userLikedList.total) {
      dispatchUserLikedListMore({
        format: 'full',
        itemsPerPage: 4,
        page,
        userUid,
      });
    }
  }, [page]);

  useEffect(() => {
    dispatchUserLikedList({ format: 'full', itemsPerPage: 4, page, userUid });
  }, []);

  return (
    <Card variant="outlined">
      <CardHeader title="Liked Articles" />
      <CardContent>
        {!_.isEmpty(userLikedList.rows) && (
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation
            virtual
            onReachEnd={handleReachEnd}
            style={{ padding: '5px 25px' }}
          >
            {_.map(userLikedList.rows, (row, index) => (
              <SwiperSlide virtualIndex={index} key={row}>
                <GridFeed uid={row} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </CardContent>
    </Card>
  );
}

LikedArticles.propTypes = {
  userUid: PropTypes.string,
  dispatchUserLikedList: PropTypes.func,
  dispatchUserLikedListMore: PropTypes.func,
  userLikedList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userLikedList: makeSelectUserLikedList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUserLikedList: options => dispatch(userLikedListAction(options)),
    dispatchUserLikedListMore: options => dispatch(userLikedListMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LikedArticles);
