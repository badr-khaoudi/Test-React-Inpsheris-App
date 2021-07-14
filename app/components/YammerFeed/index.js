/**
 *
 * YammerFeed
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { initials } from 'utils/helpers/avatarInitials';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';

import {
  OuterIcon,
  CommunityLogo,
  CommunityAvatar,
  ActivityDate,
} from 'containers/Feed/Wrapper';
import DOMPurify from 'dompurify';
import CheckType from 'components/FeedTypes/checkType';
import { ReactComponent as Yammer } from 'images/icons/yammerLogo.svg';
import { YammerLogo } from './Wrapper';

function YammerFeed({ content }) {
  return (
    <Grid container wrap="nowrap">
      <Grid item>
        <OuterIcon>
          <a
            href={content.community.yammerWebUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {content.community.headerLogoUrl ? (
              <CommunityLogo src={content.community.headerLogoUrl} />
            ) : (
              <CommunityAvatar>
                {initials(content.community.label)}
              </CommunityAvatar>
            )}
          </a>
          <ActivityDate variant="body2" display="block">
            {moment(content.publicationStartDate).format('DD MMM YYYY, HH:mm')}
          </ActivityDate>
        </OuterIcon>
      </Grid>
      <Grid item xs zeroMinWidth>
        <Card
          elevation={0}
          style={{
            boxShadow:
              '2px 3px 5px rgba(191, 227, 253, 0.25), 0px -2px 13px 1px rgba(191, 227, 253, 0.25)',
            marginBottom: 30,
          }}
        >
          <CardHeader
            action={
              <YammerLogo>
                <Yammer aria-hidden="true" />
              </YammerLogo>
            }
            title={
              <Typography variant="h6">{`${content.author.firstName} ${
                content.author.lastName
              }`}</Typography>
            }
            subheader={
              <Typography variant="subtitle1">
                {`has ${
                  content.previousAction === content.lastAction
                    ? content.previousAction
                    : content.lastAction
                } ${content.type} in `}
                <a
                  href={content.community.yammerWebUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {content.community.label}
                </a>
              </Typography>
            }
          />
          <Divider variant="middle" />
          <CardContent>
            <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content.parseText),
              }}
            />
            {!_.isEmpty(content.blocks) && CheckType(_.head(content.blocks))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

YammerFeed.propTypes = { content: PropTypes.object };

export default memo(YammerFeed);
