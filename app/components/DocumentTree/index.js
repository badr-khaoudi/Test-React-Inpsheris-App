/**
 *
 * DocumentTree
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import {
  ListItemText,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Grid,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { MoreVert, GetApp } from '@material-ui/icons';
import { SimpleMenu } from 'containers/Feed/Wrapper';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { DocumentIcons, Folder } from 'components/Icons';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function DocumentTree(props) {
  const {
    documents,
    setDocumentId,
    hasActions,
    handleFolderClick,
    handleDocumentDelete,
    handleFolderRename,
    setNewFolderOpen,
    setMoveDocumentOpen,
    disabledItem,
    setBrowseAllOpen,
    handleUpload,
  } = props;

  const [folderAnchorEl, setFolderAnchorEl] = useState(null);
  const [fileAnchorEl, setFileAnchorEl] = useState(null);

  const handleFolderMenuClose = () => {
    setDocumentId(undefined);
    setFolderAnchorEl(null);
  };

  const handleFileMenuClose = () => {
    setDocumentId(undefined);
    setFileAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [file, setFile] = useState(undefined);

  return (
    <>
      <List>
        {_.map(documents, document =>
          document.documentType === 'Folder' ? (
            <ListItem
              key={document.id}
              button
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
              onClick={() => handleFolderClick(document)}
              disabled={disabledItem && document.id === disabledItem}
            >
              <ListItemIcon>
                <Folder />
              </ListItemIcon>
              <ListItemText primary={document.title} />
              {hasActions && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={e => {
                      setDocumentId(document);
                      setFolderAnchorEl(e.currentTarget);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ) : (
            <ListItem
              key={document.id}
              button
              style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
              <ListItemIcon>
                <DocumentIcons type={document.fileBlock.fileType} />
              </ListItemIcon>
              <ListItemText
                primary={document.title}
                onClick={e => {
                  setFile(document);
                  setAnchorEl(e.currentTarget);
                }}
              />
              {hasActions && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={e => {
                      setDocumentId(document);
                      setFileAnchorEl(e.currentTarget);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ),
        )}
      </List>
      {hasActions && (
        <>
          <SimpleMenu
            elevation={0}
            anchorEl={fileAnchorEl}
            open={Boolean(fileAnchorEl)}
            onClose={handleFileMenuClose}
          >
            <MenuItem
              dense
              onClick={() => {
                setFileAnchorEl(null);
                setMoveDocumentOpen(true);
              }}
            >
              Move to
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                setFileAnchorEl(null);
                handleDocumentDelete();
              }}
            >
              Delete
            </MenuItem>
          </SimpleMenu>
          <SimpleMenu
            elevation={0}
            anchorEl={folderAnchorEl}
            open={Boolean(folderAnchorEl)}
            onClose={handleFolderMenuClose}
          >
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                handleFolderRename();
              }}
            >
              Rename folder
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                setMoveDocumentOpen(true);
              }}
            >
              Move to
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                handleDocumentDelete();
              }}
            >
              Delete folder
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                setNewFolderOpen(true);
              }}
            >
              Add a subfolder
            </MenuItem>
            <Divider />
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                setBrowseAllOpen(true);
              }}
            >
              Browse the platform
            </MenuItem>
            <MenuItem
              dense
              onClick={() => {
                setFolderAnchorEl(null);
                handleUpload();
              }}
            >
              Upload from my computer
            </MenuItem>
          </SimpleMenu>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {file && (
              <div style={{ width: 350, padding: 16 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {file.title}
                  </Grid>
                  <Grid item xs={12}>
                    <Thumbnail thumbnail_url={file.fileBlock.thumbGalleryUrl} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="outlined" fullWidth>
                      Voir aperçu
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      fullWidth
                      href={file.fileBlock.path}
                      download
                    >
                      Download File
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <b>File Name:</b>
                          </td>
                          <td style={{ wordBreak: 'break-all' }}>
                            {file.fileBlock.fileName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Type:</b>
                          </td>
                          <td>{file.fileBlock.fileType}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Created:</b>
                          </td>
                          <td>
                            {moment(file.fileBlock.fileUploadedDate).format(
                              'DD MMM YYYY',
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Source:</b>
                          </td>
                          <td>
                            {file.fileBlock.isInternal
                              ? 'Local'
                              : file.fileBlock.externalSource}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
              </div>
            )}
          </Popover>
        </>
      )}
    </>
  );
}

DocumentTree.propTypes = {
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setDocumentId: PropTypes.func,
  hasActions: PropTypes.bool,
  handleFolderClick: PropTypes.func,
  handleDocumentDelete: PropTypes.func,
  handleFolderRename: PropTypes.func,
  setNewFolderOpen: PropTypes.func,
  setMoveDocumentOpen: PropTypes.func,
  disabledItem: PropTypes.number,
  setBrowseAllOpen: PropTypes.func,
  handleUpload: PropTypes.func,
};

export default memo(DocumentTree);
