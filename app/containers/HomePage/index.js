/* eslint-disable indent */
/**
 *
 * HomePage
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { Container, Grid, CardContent } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { CustomBoxShadowCard, CustomContainer } from 'common';
import FirstLevelCarousel from 'components/FirstLevelCarousel';
import SecondLevelCarousel from 'components/SecondLevelCarousel';
import PinnedContent from 'components/PinnedContent';
import {
  makeSelectConfig,
  makeSelectCurrentUser,
  makeSelectCommunityList,
} from 'containers/AuthBase/selectors';
import HomeFeed from 'containers/HomeFeed';
import WidgetContainer from 'containers/WidgetContainer';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  LivelyHomeLayoutGrid,
  FirstLevelCarouselSkeletonContainer,
} from './wrapper';
import {
  makeSelectFirstLevelCarouselList,
  makeSelectFirstLevelCarouselListLoading,
  makeSelectSecondLevelCarouselList,
  makeSelectSecondLevelCarouselListLoading,
  makeSelectPinnedContent,
  makeSelectPinnedContentLoading,
  makeSelectWidgetList,
  makeSelectWidgetListLoading,
  makeSelectPinnedCommunityList,
  makeSelectPinnedCommunityListLoading,
  makeSelectPinnedCommunityListSuccess,
} from './selectors';
import saga from './saga';
import reducer from './reducer';
import { getCarouselList, getPinnedContent, getWidgetList } from './actions';

export function HomePage({
  firstLevelCarouselList,
  firstLevelCarouselListLoading,
  secondLevelCarouselList,
  secondLevelCarouselListLoading,
  pinnedContent,
  pinnedContentLoading,
  widgetList,
  dispatchGetCarouselList,
  dispatchPinnedContent,
  dispatchGetWidgetList,
  locale,
  secondarySlider,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    dispatchGetCarouselList();
    dispatchPinnedContent({ language: locale });
    dispatchGetWidgetList();
  }, []);

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
        <meta httpEquiv="X-UA-Compatible" content="IE=EmulateIE11" />
      </Helmet>
      {firstLevelCarouselListLoading ? (
        <Container maxWidth="lg">
          <FirstLevelCarouselSkeletonContainer>
            <Skeleton variant="rect" width={1500} height={315} />
            <Skeleton className="dots-skeleton" height={25} width={150} />
          </FirstLevelCarouselSkeletonContainer>
        </Container>
      ) : (
        <FirstLevelCarousel list={firstLevelCarouselList} />
      )}
      <CustomContainer maxWidth="lg">
        <LivelyHomeLayoutGrid container spacing={4}>
          <Grid item sm={12} md={8} lg={8}>
            {secondarySlider.value && (
              <>
                {secondLevelCarouselListLoading && (
                  <Skeleton variant="rect" height={180} />
                )}
                {!_.isEmpty(secondLevelCarouselList) && (
                  <CustomBoxShadowCard>
                    <CardContent>
                      {<SecondLevelCarousel list={secondLevelCarouselList} />}
                    </CardContent>
                  </CustomBoxShadowCard>
                )}
              </>
            )}
            <HomeFeed />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            {pinnedContent && pinnedContent.length !== 0 && (
              <PinnedContent
                loading={pinnedContentLoading}
                data={pinnedContent}
              />
            )}
            <WidgetContainer widgetList={widgetList} />
          </Grid>
        </LivelyHomeLayoutGrid>
      </CustomContainer>
    </>
  );
}

HomePage.propTypes = {
  firstLevelCarouselList: PropTypes.array,
  firstLevelCarouselListLoading: PropTypes.bool,
  secondLevelCarouselList: PropTypes.array,
  secondLevelCarouselListLoading: PropTypes.bool,
  pinnedContent: PropTypes.array,
  pinnedContentLoading: PropTypes.bool,
  widgetList: PropTypes.array,
  dispatchGetCarouselList: PropTypes.func,
  dispatchPinnedContent: PropTypes.func,
  dispatchGetWidgetList: PropTypes.func,
  locale: PropTypes.string,
  secondarySlider: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  firstLevelCarouselList: makeSelectFirstLevelCarouselList(),
  firstLevelCarouselListLoading: makeSelectFirstLevelCarouselListLoading(),
  secondLevelCarouselList: makeSelectSecondLevelCarouselList(),
  secondLevelCarouselListLoading: makeSelectSecondLevelCarouselListLoading(),
  pinnedContent: makeSelectPinnedContent(),
  pinnedContentLoading: makeSelectPinnedContentLoading(),
  widgetList: makeSelectWidgetList(),
  widgetListLoading: makeSelectWidgetListLoading(),
  pinnedCommunityList: makeSelectPinnedCommunityList(),
  pinnedCommunityListLoading: makeSelectPinnedCommunityListLoading(),
  pinnedCommunityListSuccess: makeSelectPinnedCommunityListSuccess(),
  locale: makeSelectLocale(),
  secondarySlider: makeSelectConfig('SECONDARY_SLIDER'),
  showLastThreeArticlesForPinCommunityPost: makeSelectConfig(
    'SHOW_LAST_3_ARTICLES_FOR_PIN_COMMUNITY_POST',
  ),
  currentUser: makeSelectCurrentUser(),
  communityList: makeSelectCommunityList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetCarouselList: () => dispatch(getCarouselList()),
    dispatchPinnedContent: options => dispatch(getPinnedContent(options)),
    dispatchGetWidgetList: () => dispatch(getWidgetList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
