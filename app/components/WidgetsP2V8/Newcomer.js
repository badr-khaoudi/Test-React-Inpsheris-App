/**
 *
 * Newcomer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import Link from 'utils/helpers/Link';
import MiniProfile from 'containers/MiniProfile';
import NewcomerIcon from 'components/Icons/Newcomer';
import {
  WidgetCard,
  WidgetContainer,
  WidgetContent,
  WidgetAvatar,
} from './Wrapper';

function Newcomer({ newcomerData }) {
  const newcomer = _.head(newcomerData.users);
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
                <NewcomerIcon fontSize="large" />
              </WidgetAvatar>
            </Grid>
            <Grid item xs>
              <MiniProfile user={newcomer.uid}>
                <Typography variant="h6" display="inline">{`${
                  newcomer.firstName
                } ${newcomer.lastName}`}</Typography>
              </MiniProfile>
              <Typography>
                a{' '}
                <Link
                  color="secondary"
                  to={`/search/general/all/global/${encodeURIComponent(
                    '#rejoint',
                  )}/true/false/`}
                >
                  #rejoint
                </Link>{' '}
                le réseau FDJ. Souhaitez-lui la bienvenue !
              </Typography>
            </Grid>
            <Grid item>
              <Link color="textSecondary" underline="always" to="/">
                View Others
              </Link>
            </Grid>
          </Grid>
          <Link
            color="secondary"
            to="/"
            style={{ position: 'absolute', top: 16, right: 16 }}
          >
            <Grid container alignItems="center">
              <Label fontSize="small" style={{ marginRight: 4 }} /> Arrivée
            </Grid>
          </Link>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

Newcomer.propTypes = { newcomerData: PropTypes.object };

export default memo(Newcomer);
