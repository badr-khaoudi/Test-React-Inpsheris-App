/**
 *
 * MyBoard
 *
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AddSpeciality from 'containers/AddSpeciality/Loadable';
import PinnedPosts from 'containers/PinnedPosts/Loadable';
import LikedArticles from 'containers/LikedArticles/Loadable';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './swiper.scss';
import {} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import Projects from './Projects';
import Experiences from './Experiences';
import { projects, experiences } from './actions';

export function MyBoard(props) {
  useInjectReducer({ key: 'myBoard', reducer });
  useInjectSaga({ key: 'myBoard', saga });

  const { userUid, dispatchProjects, dispatchExperiences } = props;
  const [addSpecialityOpen, setAddSpecialityOpen] = useState(false);
  const [specialityType, setSpecialityType] = useState('');
  const [specialityData, setSpecialityData] = useState({});

  const handleAddSpecialityOpen = useCallback((type, data = {}) => {
    setSpecialityType(type);
    setSpecialityData(data);
    setAddSpecialityOpen(true);
  }, []);

  const handleAddSpecialityClose = () => {
    setAddSpecialityOpen(false);
    setSpecialityData({});
    setSpecialityType('');
  };

  useEffect(() => {
    dispatchProjects({
      page: 1,
      size: 4,
      type: 'Project',
      userUid,
    });
    dispatchExperiences({
      page: 1,
      size: 4,
      type: 'Experience',
      userUid,
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Projects
            userUid={userUid}
            handleAddSpecialityOpen={handleAddSpecialityOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <Experiences
            userUid={userUid}
            handleAddSpecialityOpen={handleAddSpecialityOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <PinnedPosts userUid={userUid} />
        </Grid>
        <Grid item xs={12}>
          <LikedArticles userUid={userUid} />
        </Grid>
      </Grid>
      {addSpecialityOpen && (
        <AddSpeciality
          open={addSpecialityOpen}
          specialityType={specialityType}
          specialityData={specialityData}
          handleClose={handleAddSpecialityClose}
        />
      )}
    </>
  );
}

MyBoard.propTypes = {
  userUid: PropTypes.string,
  dispatchProjects: PropTypes.func,
  dispatchExperiences: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchProjects: options => dispatch(projects(options)),
    dispatchExperiences: options => dispatch(experiences(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyBoard);
