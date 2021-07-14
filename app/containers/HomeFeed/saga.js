import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { homeFeed } from 'utils/api/HomeFeedApi';
import { widgetList, pinnedCommunityList } from 'utils/api/HomeApi';
import { getPinnedCommunityListSuccess } from 'containers/HomePage/actions';
import { makeSelectConfig } from 'containers/AuthBase/selectors';
import { GET_HOME_FEED } from './constants';
import { getHomeFeedSuccess, getHomeFeedError } from './actions';

const showWidgets = widget => {
  if (
    widget.active &&
    (!_.isEmpty(widget.countdownClockData) ||
      !_.isEmpty(widget.newcomerData) ||
      !_.isEmpty(widget.questions) ||
      !_.isEmpty(widget.todayBirthdays) ||
      !_.isEmpty(widget.newcomerData) ||
      !_.isEmpty(widget.videoGallery) ||
      !_.isEmpty(widget.events) ||
      widget.type === 'LivelyFlexDesk' ||
      widget.type === 'FCKEditor' ||
      widget.type === 'RSS')
  ) {
    return { uid: widget.uid, type: 'widget' };
  }
  return false;
};

export function* getHomeFeed({ widgets: _widgets, options, cancelToken }) {
  try {
    const { response, entities: feedEntities, result: feedResult } = yield call(
      homeFeed,
      options,
      cancelToken,
    );
    if (options.page === 1 && options.type === 'lively' && _widgets) {
      const showLast3Articles = yield select(
        makeSelectConfig('SHOW_LAST_3_ARTICLES_FOR_PIN_COMMUNITY_POST'),
      );
      const {
        entities: { widgets, ...rest },
        result: widgetResult,
      } = yield call(widgetList, undefined, cancelToken);
      let filteredWidgets = _.compact(
        _.map(widgetResult, widget => showWidgets(widgets[widget])),
      );
      if (showLast3Articles.value) {
        const { data } = yield call(pinnedCommunityList, cancelToken);
        yield put(getPinnedCommunityListSuccess(data));
        if (!_.isEmpty(data)) {
          filteredWidgets = [
            { uid: 'pin-community', type: 'pin-community' },
            ...filteredWidgets,
          ];
        }
      }
      const contents = _.compact(
        _.flatten(
          _.zip(
            _.map(feedResult, uid => ({ uid, type: 'feed' })),
            filteredWidgets,
          ),
        ),
      );
      yield put(entitiesUpdate(_.merge(feedEntities, widgets, rest)));
      yield put(getHomeFeedSuccess({ ...response, contents }));
    } else {
      yield put(entitiesUpdate(feedEntities));
      yield put(
        getHomeFeedSuccess({
          ...response,
          contents: _.map(feedResult, uid => ({ uid, type: 'feed' })),
        }),
      );
    }
  } catch (error) {
    yield put(getHomeFeedError(error.message));
  }
}

export default function* homeFeedSaga() {
  yield takeLatest(GET_HOME_FEED, getHomeFeed);
}
