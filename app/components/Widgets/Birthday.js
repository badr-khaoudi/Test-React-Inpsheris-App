/**
 *
 * Birthday
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  Typography,
  CardContent,
  Grid,
  List,
  ListItemAvatar,
  ListItemText,
  Chip,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { SwapHoriz, Message, Call } from '@material-ui/icons';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { openDirectoryPrivateMessage } from 'containers/AuthBase/actions';
import MiniProfile from 'containers/MiniProfile';
import { initials } from 'utils/helpers/avatarInitials';
import Cake from 'images/Cake.png';
import Confetti from 'images/Confetti.png';
import { WidgetCard, BorderAvatar } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

const UpcomingBirthdays = ({ nextBirthdays }) => (
  <>
    <Typography variant="h6">Upcoming Birthdays</Typography>
    <List>
      {_.map(nextBirthdays, nextBirthday => (
        <ListItem
          key={nextBirthday.uid}
          button
          component={Link}
          to={`/myprofile/${nextBirthday.uid}/About`}
        >
          <ListItemAvatar>
            <BorderAvatar src={nextBirthday.headerLogoUrl}>
              {initials([nextBirthday.firstName, nextBirthday.lastName])}
            </BorderAvatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <MiniProfile user={nextBirthday.uid}>
                <span>{`${nextBirthday.firstName} ${
                  nextBirthday.lastName
                }`}</span>
              </MiniProfile>
            }
            secondary={
              <Chip
                component="span"
                size="small"
                label={moment(nextBirthday.dateOfBirth).format('Do MMM')}
              />
            }
          />
        </ListItem>
      ))}
    </List>
  </>
);

function Birthday({ todayBirthdays, nextBirthdays }) {
  const dispatch = useDispatch();
  return (
    <div
      style={
        !_.isEmpty(todayBirthdays)
          ? { position: 'relative', minHeight: 240 }
          : null
      }
    >
      <div
        style={{
          width: '100%',
          minHeight: 150,
          background: '#F3F3F3',
          borderRadius: '0 0 80% 80% / 100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 30,
        }}
      >
        {_.isEmpty(todayBirthdays) ? (
          <>
            <img
              width="100"
              src={Cake}
              alt="Cake"
              style={{ marginBottom: 10 }}
            />
            <Typography variant="h6">No Birthdays</Typography>
          </>
        ) : (
          <img
            width="100%"
            style={{ position: 'absolute', left: 0, bottom: -50 }}
            src={Confetti}
            alt="Confetti"
          />
        )}
      </div>
      {_.isEmpty(todayBirthdays) && !_.isEmpty(nextBirthdays) && (
        <UpcomingBirthdays nextBirthdays={nextBirthdays} />
      )}
      {!_.isEmpty(todayBirthdays) && (
        <div style={{ position: 'absolute', left: 0, top: 20, width: '100%' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Today&apos;s Birthday
          </Typography>
          <Swiper
            spaceBetween={60}
            slidesPerView={1}
            navigation
            virtual
            style={{ padding: '5px 60px' }}
          >
            {_.map(todayBirthdays, (todayBirthday, index) => (
              <SwiperSlide virtualIndex={index} key={todayBirthday.uid}>
                <div style={{ position: 'relative', paddingTop: 25 }}>
                  <BorderAvatar
                    src={todayBirthday.headerLogoUrl}
                    style={{
                      position: 'absolute',
                      height: 85,
                      width: 85,
                      left: '50%',
                      top: 0,
                      transform: 'translate(-50%, 0%)',
                    }}
                  >
                    {initials([
                      todayBirthday.firstName,
                      todayBirthday.lastName,
                    ])}
                  </BorderAvatar>
                  <WidgetCard style={{ paddingTop: 55 }}>
                    <CardContent>
                      <Typography variant="body1" align="center" gutterBottom>
                        Happy Birthday
                      </Typography>
                      <Typography variant="h6" align="center" gutterBottom>{`${
                        todayBirthday.firstName
                      } ${todayBirthday.lastName}`}</Typography>
                      {!_.isEmpty(todayBirthday.positions) && (
                        <Typography variant="body1" align="center" gutterBottom>
                          {_.head(todayBirthday.positions).name}
                        </Typography>
                      )}
                      <Grid
                        container
                        spacing={1}
                        alignContent="center"
                        justify="center"
                      >
                        <Grid item>
                          <IconButton>
                            <SwapHoriz fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton>
                            <Call fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={e => {
                              e.preventDefault();
                              dispatch(
                                openDirectoryPrivateMessage(todayBirthday),
                              );
                            }}
                          >
                            <Message fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </WidgetCard>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {!_.isEmpty(nextBirthdays) && (
            <UpcomingBirthdays nextBirthdays={nextBirthdays} />
          )}
        </div>
      )}
    </div>
  );
}

Birthday.propTypes = {
  todayBirthdays: PropTypes.array,
  nextBirthdays: PropTypes.array,
};

UpcomingBirthdays.propTypes = {
  nextBirthdays: PropTypes.array,
};

export default memo(Birthday);
