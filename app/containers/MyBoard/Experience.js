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
import { deleteExperience } from './actions';

const Experience = ({ userUid, experience, handleAddSpecialityOpen }) => {
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const handleDelete = async () => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this experience?',
      });
      dispatch(
        deleteExperience({
          id: experience.id,
        }),
      );
    } catch {
      return false;
    }
    return false;
  };

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Thumbnail
              thumbnail_url={experience.image && experience.image.url}
            />
          </Grid>
          <Grid item xs={9}>
            <Grid container>
              <Grid item xs>
                <Typography variant="h5" gutterBottom>
                  {experience.title}
                </Typography>
              </Grid>
              {(currentUser.uid === userUid ||
                currentUser.role === 'GlobalCommunityManager') && (
                <>
                  <Grid item>
                    <IconButton
                      onClick={() =>
                        handleAddSpecialityOpen('Experience', experience)
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
            {experience.position && (
              <Typography>Position: {experience.position}</Typography>
            )}
            <Typography>
              {experience.dateFrom && (
                <>From: {moment(experience.dateFrom).format('DD MMM YYYY')}</>
              )}
              {experience.dateTo && (
                <> / To: {moment(experience.dateTo).format('DD MMM YYYY')}</>
              )}
            </Typography>
            {experience.numberOfYearsExperience && (
              <Typography>
                Number of years experience: {experience.numberOfYearsExperience}
              </Typography>
            )}
            {experience.location && (
              <Typography>Location: {experience.location}</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Experience.propTypes = {
  userUid: PropTypes.string,
  experience: PropTypes.object,
  handleAddSpecialityOpen: PropTypes.func,
};

export default memo(Experience);
