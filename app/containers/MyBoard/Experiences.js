import React, { memo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardHeader, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import Empty from 'components/Empty/Loadable';
import Experience from './Experience';
import { experiencesMore } from './actions';
import { makeSelectExperiences } from './selectors';

SwiperCore.use([Navigation, Virtual]);

const Experiences = ({ userUid, handleAddSpecialityOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(makeSelectCurrentUser());
  const experiences = useSelector(makeSelectExperiences());
  const pageRef = useRef(1);
  const [page, setPage] = useState(1);
  const handleReachEnd = () => {
    pageRef.current += 1;
    setPage(pageRef.current);
  };

  useEffectAfterMount(() => {
    if (page > 1 && (page - 1) * 4 < experiences.total) {
      dispatch(
        experiencesMore({
          page,
          size: 4,
          type: 'Experience',
          userUid,
        }),
      );
    }
  }, [page]);

  return (
    <Card variant="outlined">
      <CardHeader
        title="Experiences"
        action={
          (currentUser.uid === userUid ||
            currentUser.role === 'GlobalCommunityManager') && (
            <IconButton onClick={() => handleAddSpecialityOpen('Experience')}>
              <Add fontSize="small" />
            </IconButton>
          )
        }
      />
      <CardContent>
        {!_.isEmpty(experiences.rows) && (
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            navigation
            virtual
            onReachEnd={handleReachEnd}
            style={{ padding: '5px 25px' }}
          >
            {_.map(
              experiences.rows,
              (experience, index) =>
                experience.active && (
                  <SwiperSlide virtualIndex={index} key={experience.id}>
                    <Experience
                      userUid={userUid}
                      experience={experience}
                      handleAddSpecialityOpen={handleAddSpecialityOpen}
                    />
                  </SwiperSlide>
                ),
            )}
          </Swiper>
        )}
        {!_.isEmpty(experiences) && _.isEmpty(experiences.rows) && (
          <Empty
            title="No experiences available!"
            extra={
              (currentUser.uid === userUid ||
                currentUser.role === 'GlobalCommunityManager') && (
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  onClick={() => handleAddSpecialityOpen('Experience')}
                >
                  Add Experience
                </Button>
              )
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

Experiences.propTypes = {
  userUid: PropTypes.string,
  handleAddSpecialityOpen: PropTypes.func,
};

export default memo(Experiences);
