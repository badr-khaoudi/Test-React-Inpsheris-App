/**
 *
 * DriveTree
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import {
  ListItemText,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { DocumentIcons, Folder } from 'components/Icons';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function DriveTree(props) {
  const { documents, handleFolderClick } = props;

  return (
    <>
      <List>
        {_.map(documents, document =>
          document.mimeType === 'application/vnd.google-apps.folder' ? (
            <ListItem
              key={document.uid}
              button
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              onClick={() => handleFolderClick(document)}
            >
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={document.name} />
            </ListItem>
          ) : (
            <ListItem
              key={document.uid}
              button
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
              <ListItemIcon>
                <DocumentIcons type={document.mimeType} />
              </ListItemIcon>
              <ListItemText primary={document.name} />
              <ListItemSecondaryAction>
                <Button href={document.webViewLink} target="_blank">
                  View
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ),
        )}
      </List>
    </>
  );
}

DriveTree.propTypes = {
  documents: PropTypes.array,
  handleFolderClick: PropTypes.func,
};

export default memo(DriveTree);
