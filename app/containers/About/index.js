/**
 *
 * About
 *
 */

import React, { memo, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SearchDirectory from 'containers/SearchDirectory/Loadable';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import Widgets from 'components/Widgets/Loadable';
import { makeSelectWidgetList } from './selectors';
import reducer from './reducer';
import {
  communityListUser as communityListUserAction,
  widgetList as widgetListAction,
} from './actions';
import saga from './saga';
import GeneralInformation from './GeneralInformation';
import MyCommunities from './MyCommunities';
import Skills from './Skills';
import Hashtags from './Hashtags';
import MyColleagues from './MyColleagues';
import MyPartners from './MyPartners';
import Followers from './Followers';
import Following from './Following';
// import messages from './messages';

export function About(props) {
  useInjectReducer({ key: 'about', reducer });
  useInjectSaga({ key: 'about', saga });

  const {
    userUid,
    dispatchCommunityListUser,
    user,
    dispatchWidgetList,
    widgetList,
    currentUser,
  } = props;

  const canEdit = useMemo(
    () =>
      currentUser.uid === userUid ||
      currentUser.role === 'GlobalCommunityManager',
    [currentUser],
  );

  const [searchDirectoryOpen, setSearchDirectoryOpen] = useState(false);
  const [addUserType, setAddUserType] = useState(undefined);

  const handleEditMyColleagues = () => {
    setSearchDirectoryOpen(true);
    setAddUserType('coworker');
  };

  const handleEditMyPartners = () => {
    setSearchDirectoryOpen(true);
    setAddUserType('partner');
  };

  const handleClose = () => {
    setSearchDirectoryOpen(false);
    setAddUserType(undefined);
  };

  useEffect(() => {
    dispatchCommunityListUser({ format: 'full', userUid });
    dispatchWidgetList({ userUid });
  }, []);

  const skills = _.find(user.customFields, { name: 'Skill' });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GeneralInformation />
            </Grid>
            <Grid item xs={12}>
              <MyCommunities />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            {skills && skills.displayOnProfile && (
              <Grid item xs={12}>
                <Skills value={user.speciality} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Hashtags />
            </Grid>
            <Grid item xs={12}>
              <MyColleagues edit={handleEditMyColleagues} />
            </Grid>
            <Grid item xs={12}>
              <MyPartners edit={handleEditMyPartners} />
            </Grid>
            <Grid item xs={12}>
              <Followers />
            </Grid>
            <Grid item xs={12}>
              <Following />
            </Grid>
            {_.map(
              _.filter(widgetList, widget => widget.type === 'RegularCalendar'),
              widget => (
                <Grid item xs={12}>
                  <Widgets
                    uid={widget.uid}
                    canEdit={canEdit}
                    userUid={userUid}
                  />
                </Grid>
              ),
            )}
          </Grid>
        </Grid>
      </Grid>
      {searchDirectoryOpen && (
        <SearchDirectory
          open={searchDirectoryOpen}
          addUserType={addUserType}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

About.propTypes = {
  userUid: PropTypes.string,
  dispatchCommunityListUser: PropTypes.func,
  user: PropTypes.object,
  dispatchWidgetList: PropTypes.func,
  widgetList: PropTypes.array,
  currentUser: PropTypes.object,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    user: makeSelectUser(props.userUid),
    widgetList: makeSelectWidgetList(),
    currentUser: makeSelectCurrentUser(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityListUser: options =>
      dispatch(communityListUserAction(options)),
    dispatchWidgetList: options => dispatch(widgetListAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(About);
