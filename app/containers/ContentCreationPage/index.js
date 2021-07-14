/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/**
 *
 * ContentCreationPage
 *
 */

// Import redux vitals
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import { LivelyList } from './wrapper';

import {
  makeSelectQuickSharingOfLinkLikeQuickpost,
  makeSelectAlertModule,
  makeSelectNoteTheService,
  makeSelectCurrentUser,
} from '../AuthBase/selectors';

function ContentCreationPage({
  quickSharingOfLinkLikeQuickpost,
  alertModule,
  noteTheService,
  user,
}) {
  return (
    <>
      <Helmet>
        <title>ContentCreationPage</title>
        <meta
          name="description"
          content="Description of ContentCreationPage"
        />
      </Helmet>
      <Typography variant="h3" component="h3" gutterBottom>
        Content Creation
      </Typography>
      <LivelyList>
        <ListItem button>Content creation</ListItem>
        <ListItem button>Create quickpost</ListItem>
        {quickSharingOfLinkLikeQuickpost.value && (
          <ListItem button>Share a link</ListItem>
        )}
        {(alertModule.value && user.role) === 'GlobalCommunityManager' && (
          <ListItem button>Create an alert</ListItem>
        )}
        {(noteTheService.value &&
        (user.role === 'GlobalCommunityManager' || user.communityRoles)) && (
          <ListItem button>Create note de service</ListItem>
        )}
      </LivelyList>
    </>
  );
}

ContentCreationPage.propTypes = {
  quickSharingOfLinkLikeQuickpost: PropTypes.object.isRequired,
  alertModule: PropTypes.object.isRequired,
  noteTheService: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  quickSharingOfLinkLikeQuickpost: makeSelectQuickSharingOfLinkLikeQuickpost(),
  alertModule: makeSelectAlertModule(),
  noteTheService: makeSelectNoteTheService(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(ContentCreationPage);
