/**
 *
 * Birthday
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Message, Call, Email } from '@material-ui/icons';
import { openDirectoryPrivateMessage } from 'containers/AuthBase/actions';
import Link from 'utils/helpers/Link';
import BirthdayIcon from 'components/Icons/Birthday';
import {
  ContainedIconButton,
  OutlinedIconButton,
} from 'utils/helpers/iconButton';
import {
  WidgetCard,
  WidgetContainer,
  WidgetContent,
  WidgetAvatar,
} from './Wrapper';

function Birthday({ todayBirthdays }) {
  const dispatch = useDispatch();
  const todayBirthday = _.head(todayBirthdays);

  return (
    <WidgetCard>
      <WidgetContainer>
        <WidgetContent>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item>
              <WidgetAvatar $spacing={9}>
                <BirthdayIcon fontSize="large" />
              </WidgetAvatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h6">
                {`${todayBirthday.firstName} ${todayBirthday.lastName}’s
                Birthday today`}
              </Typography>
              <Typography>Take a moment to wish him Happy Birthday</Typography>
            </Grid>
            <Grid item style={{ flexShrink: 0 }}>
              <OutlinedIconButton
                style={{ marginRight: 8 }}
                onClick={e => {
                  e.preventDefault();
                  dispatch(openDirectoryPrivateMessage(todayBirthday));
                }}
              >
                <Message fontSize="small" color="primary" />
              </OutlinedIconButton>
              <ContainedIconButton $color="success" style={{ marginRight: 8 }}>
                <Call fontSize="small" />
              </ContainedIconButton>
              <OutlinedIconButton href={`mailto:${todayBirthday.email}`}>
                <Email fontSize="small" color="primary" />
              </OutlinedIconButton>
            </Grid>
            <Grid item>
              <Link color="textSecondary" underline="always" to="/">
                View Others
              </Link>
            </Grid>
          </Grid>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

Birthday.propTypes = { todayBirthdays: PropTypes.array };

export default memo(Birthday);
