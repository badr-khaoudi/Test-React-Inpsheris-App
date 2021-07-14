/**
 *
 * SortableList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Grid, CircularProgress } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import {
  AddCircleOutline,
  Edit,
  Delete,
  OpenWith,
  Publish,
} from '@material-ui/icons';
import GooglePicker from 'react-google-picker';
import loadScript from 'load-script';
import Dropzone from 'react-dropzone';
import { SimpleMenu } from 'containers/Feed/Wrapper';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import {
  UploadGrid,
  FileName,
  Actions,
  ActionButton,
  EditButton,
} from 'containers/QuickPost/Wrapper';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const SortableItem = SortableElement(
  ({ value, handleUploadCancel, handleEdit, handleDelete }) => (
    <Grid item xs={3}>
      <Thumbnail thumbnail_url={value.thumbGalleryUrl}>
        {value.uploading && (
          <Grid
            container
            alignContent="center"
            justify="center"
            style={{ height: '100%', position: 'absolute', top: 0 }}
          >
            <CircularProgress aria-busy="true" />
          </Grid>
        )}
        <FileName>{value.fileName}</FileName>
        <Actions>
          {((value.uploading && value.uploading !== true) ||
            (value.isExternalFile !== undefined && !value.isExternalFile) ||
            (value.isInternal !== undefined && value.isInternal)) && (
            <EditButton onClick={() => handleEdit(value.uid)}>
              <Edit />
            </EditButton>
          )}
          <ActionButton
            onClick={() => {
              if (value.uploading) {
                return handleUploadCancel(value.tempUid);
              }
              return handleDelete(value.uid);
            }}
          >
            <Delete />
          </ActionButton>
          <ActionButton onClick={() => {}}>
            <OpenWith />
          </ActionButton>
        </Actions>
      </Thumbnail>
    </Grid>
  ),
);

const SortableList = SortableContainer(
  ({
    items,
    type,
    handleBrowseOpen,
    browseAnchorEl,
    handleBrowseClose,
    handleBrowseAllOpen,
    handleGoogleOnChange,
    handleOneDriveSuccess,
    handleOnDrop,
    handleUploadCancel,
    handleEdit,
    handleDelete,
  }) => (
    <Grid container spacing={2}>
      {items &&
        _.map(items, (item, index) => (
          <SortableItem
            key={item.tempUid || item.uid}
            index={index}
            value={item}
            handleUploadCancel={handleUploadCancel}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      <Grid item xs={3}>
        <UploadGrid>
          <Grid container style={{ height: '100%' }}>
            <Grid
              item
              xs={12}
              style={{
                borderBottom: '2px dotted #768493',
                height: '75%',
              }}
            >
              <Dropzone
                accept={
                  type === 'Documents'
                    ? 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel.sheet.macroEnabled.12, application/pdf, application/zip, application/gzip, application/x-7z-compressed, application/vnd.sqlite3, application/x-sqlite3'
                    : 'image/png, image/jpg, image/gif, image/jpeg'
                }
                onDrop={acceptedFiles => handleOnDrop(acceptedFiles)}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <ButtonBase
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Grid container direction="column" alignItems="center">
                        <Publish />
                        Drop to upload
                      </Grid>
                    ) : (
                      <Grid container direction="column" alignItems="center">
                        <AddCircleOutline />
                        Upload /<br /> Drag and Drop
                      </Grid>
                    )}
                  </ButtonBase>
                )}
              </Dropzone>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                height: '25%',
              }}
            >
              <ButtonBase
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={handleBrowseOpen}
              >
                Browse
              </ButtonBase>
              <SimpleMenu
                elevation={0}
                anchorEl={browseAnchorEl}
                open={Boolean(browseAnchorEl)}
                onClose={handleBrowseClose}
              >
                <MenuItem
                  dense
                  onClick={() => {
                    handleBrowseClose();
                    handleBrowseAllOpen();
                  }}
                >
                  Browse All
                </MenuItem>
                <GooglePicker
                  clientId="72136496614-pt18lo67nvikehobm4l2c3cc051jj9n1.apps.googleusercontent.com"
                  scope={['https://www.googleapis.com/auth/drive.readonly']}
                  onAuthFailed={data => console.log(data)}
                  authImmediate={false}
                  createPicker={(google, oauthToken) => {
                    let picker;
                    if (type === 'Documents') {
                      picker = new window.google.picker.PickerBuilder()
                        .addView(google.picker.ViewId.DOCUMENTS)
                        .addView(google.picker.ViewId.PRESENTATIONS)
                        .addView(google.picker.ViewId.SPREADSHEETS)
                        .addView(google.picker.ViewId.FORMS)
                        .enableFeature(
                          google.picker.Feature.MULTISELECT_ENABLED,
                        )
                        .setOAuthToken(oauthToken)
                        .setDeveloperKey(
                          'AIzaSyDL30y_CKZCzFxAE3Cd9sW3yC5MS5uOBpM',
                        )
                        .setCallback(handleGoogleOnChange);
                    } else if (type === 'Images') {
                      picker = new window.google.picker.PickerBuilder()
                        .addView(google.picker.ViewId.DOCS_IMAGES)
                        .enableFeature(
                          google.picker.Feature.MULTISELECT_ENABLED,
                        )
                        .setOAuthToken(oauthToken)
                        .setDeveloperKey(
                          'AIzaSyDL30y_CKZCzFxAE3Cd9sW3yC5MS5uOBpM',
                        )
                        .setCallback(handleGoogleOnChange);
                    }
                    picker.build().setVisible(true);
                  }}
                >
                  <MenuItem dense onClick={handleBrowseClose}>
                    Google Drive
                  </MenuItem>
                </GooglePicker>
                <MenuItem
                  dense
                  onClick={() => {
                    handleBrowseClose();
                    loadScript('https://js.live.net/v7.2/OneDrive.js', () =>
                      window.OneDrive.open({
                        clientId: '884afe20-27bd-4f79-852e-ecee1735bf7f',
                        action: 'query',
                        multiSelect: true,
                        advanced: {
                          queryParameters:
                            'select=id,name,size,file,folder,photo,@microsoft.graph.downloadUrl,createdDateTime,lastModifiedDateTime&expand=thumbnails',
                          redirectUri: `${
                            window.location.origin
                          }/onedrive_picker.html`,
                          filter:
                            type === 'Documents'
                              ? 'folder,.ppt,.pot,.pps,.pptx,.pptm,.potx,.potm,.ppam,.ppsx,.ppsm,.sldx,.sldm,.doc,.dot,.wbk,.docx,.docm,.dotx,.dotm,.docb,.pdf,.xlsx,.xls,.csv,.xlt,.xlsm,.xltx,.xltm,.xlsb,.xla,.xlam,.xll,.xlw,.accdb,.accde,.accdt,.accdr,.db'
                              : 'folder,photo,.gif,.heic,.heif,.jpeg,.jpg,.jpe,.mef,.mrw,.nef,.nrw,.orf,.pano,.pef,.png,.rw2,.spm,.tif,.tiff,.xbm,.xcf',
                        },
                        success: file => handleOneDriveSuccess(file),
                        error: error => console.log(error),
                      }),
                    );
                  }}
                >
                  One Drive
                </MenuItem>
              </SimpleMenu>
            </Grid>
          </Grid>
        </UploadGrid>
      </Grid>
    </Grid>
  ),
);

export default SortableList;
