import React, { memo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardHeader, CardContent, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Add } from '@material-ui/icons';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import Empty from 'components/Empty/Loadable';
import Project from './Project';
import { projects as projectsAction, projectsMore } from './actions';
import { makeSelectProjects } from './selectors';

SwiperCore.use([Navigation, Virtual]);

const Projects = ({ userUid, handleAddSpecialityOpen }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(makeSelectCurrentUser());
  const projects = useSelector(makeSelectProjects());
  const pageRef = useRef(1);
  const [page, setPage] = useState(1);
  const handleReachEnd = () => {
    pageRef.current += 1;
    setPage(pageRef.current);
  };

  const [active, setActive] = useState(true);

  useEffectAfterMount(() => {
    dispatch(
      projectsAction({
        page: 1,
        active,
        size: 4,
        type: 'Project',
        userUid,
      }),
    );
  }, [active]);

  useEffectAfterMount(() => {
    if (page > 1 && (page - 1) * 4 < projects.total) {
      dispatch(
        projectsMore({
          page,
          size: 4,
          type: 'Project',
          userUid,
        }),
      );
    }
  }, [page]);

  return (
    <Card variant="outlined">
      <CardHeader
        title="Projects"
        action={
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ButtonGroup disableElevation color="primary">
                <Button
                  onClick={() => setActive(true)}
                  variant={active ? 'contained' : 'outlined'}
                >
                  Past Projects
                </Button>
                <Button
                  onClick={() => setActive(false)}
                  variant={active ? 'outlined' : 'contained'}
                >
                  Present Projects
                </Button>
              </ButtonGroup>
            </Grid>
            {(currentUser.uid === userUid ||
              currentUser.role === 'GlobalCommunityManager') && (
              <Grid item>
                <IconButton onClick={() => handleAddSpecialityOpen('Project')}>
                  <Add fontSize="small" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        }
      />
      <CardContent>
        {!_.isEmpty(projects.rows) && (
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            navigation
            virtual
            onReachEnd={handleReachEnd}
            style={{ padding: '5px 25px' }}
          >
            {_.map(
              projects.rows,
              (project, index) =>
                project.active && (
                  <SwiperSlide virtualIndex={index} key={project.id}>
                    <Project
                      userUid={userUid}
                      project={project}
                      handleAddSpecialityOpen={handleAddSpecialityOpen}
                    />
                  </SwiperSlide>
                ),
            )}
          </Swiper>
        )}
        {!_.isEmpty(projects) && _.isEmpty(projects.rows) && (
          <Empty
            title="No projects available!"
            extra={
              (currentUser.uid === userUid ||
                currentUser.role === 'GlobalCommunityManager') && (
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  onClick={() => handleAddSpecialityOpen('Project')}
                >
                  Add Project
                </Button>
              )
            }
          />
        )}
      </CardContent>
    </Card>
  );
};

Projects.propTypes = {
  userUid: PropTypes.string,
  handleAddSpecialityOpen: PropTypes.func,
};

export default memo(Projects);
