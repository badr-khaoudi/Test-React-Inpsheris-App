import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Grid, CardContent, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { Edit, Delete } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { deleteProject } from './actions';

const Project = ({ userUid, project, handleAddSpecialityOpen }) => {
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleDelete = async () => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this experience?',
      });
      dispatch(deleteProject({ id: project.id }));
    } catch {
      return false;
    }
    return false;
  };

  return (
    <Card style={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Thumbnail thumbnail_url={project.image && project.image.url} />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs>
                <Typography variant="h5" gutterBottom>
                  {project.title}
                </Typography>
              </Grid>
              {(currentUser.uid === userUid ||
                currentUser.role === 'GlobalCommunityManager') && (
                <>
                  <Grid item>
                    <IconButton
                      onClick={() =>
                        handleAddSpecialityOpen('Project', project)
                      }
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleDelete}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Grid>
                </>
              )}
            </Grid>
            {project.projectCode && (
              <Typography>Project Code: {project.projectCode}</Typography>
            )}
            <Typography>
              {project.dateFrom && (
                <>From: {moment(project.dateFrom).format('DD MMM YYYY')}</>
              )}
              {project.dateTo && (
                <> / To: {moment(project.dateTo).format('DD MMM YYYY')}</>
              )}
            </Typography>
            {project.description && (
              <Typography>Description: {project.description}</Typography>
            )}
            {project.numberOfYearsExperience && (
              <Typography>
                Number of years experience: {project.numberOfYearsExperience}
              </Typography>
            )}
            {project.position && (
              <Typography>Position: {project.position}</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Project.propTypes = {
  userUid: PropTypes.string,
  project: PropTypes.object,
  handleAddSpecialityOpen: PropTypes.func,
};

export default memo(Project);
