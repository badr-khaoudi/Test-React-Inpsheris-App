/**
 *
 * DocumentBlock
 *
 */

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Close } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { useConfirm } from 'material-ui-confirm';
import arrayMove from 'array-move';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import BrowseAll from 'containers/BrowseAll/Loadable';
import FileDetails from 'containers/FileDetails/Loadable';
import SortableList from 'components/SortableList/Loadable';
import MessageDialog from 'components/MessageDialog/Loadable';
import { enablePublish, disablePublish } from 'containers/QuickPost/actions';
import { makeSelectUploadFile } from './selectors';
import { uploadFile, cleanUploadFile } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function DocumentBlock(props) {
  useInjectReducer({ key: 'documentBlock', reducer });
  useInjectSaga({ key: 'documentBlock', saga });

  const {
    type,
    dispatchUploadFile,
    dispatchCleanUploadFile,
    uploadedFile,
    items,
    setItems,
    handleClose,
    dispatchEnablePublish,
    dispatchDisablePublish,
    id,
  } = props;

  const confirm = useConfirm();

  const [browseAnchorEl, setBrowseAnchorEl] = useState(null);
  const [browseAllOpen, setBrowseAllOpen] = useState(false);
  const [fileDetailsOpen, setFileDetailsOpen] = useState(false);
  const [fileUid, setFileUid] = useState('');
  const [fileCount, setFileCount] = useState(0);

  const handleBrowseOpen = useCallback(e => {
    setBrowseAnchorEl(e.currentTarget);
  }, []);

  const handleBrowseClose = useCallback(() => {
    setBrowseAnchorEl(null);
  }, []);

  const handleFileDetailsOpen = useCallback(uid => {
    setFileUid(uid);
    setFileDetailsOpen(true);
  }, []);

  const handleBrowseAllOpen = useCallback(() => {
    setBrowseAllOpen(true);
  }, []);

  const handleBrowseAllClose = () => {
    setBrowseAllOpen(false);
    handleBrowseClose();
  };

  const handleBrowseAllOk = useCallback(
    files => {
      setItems([
        ...items,
        ..._.map(files, file => ({
          uid: file.fileUid,
          isInternal: !file.isExternalFile,
          fileName: file.fileName,
          mimeType: file.fileType,
          createdDate: file.createdDate || file.uploadedDate,
          webViewLink: file.url,
          thumbGalleryUrl: file.thumbGalleryUrl,
          externalSource: file.fileExternalSource || '',
        })),
      ]);
      setBrowseAllOpen(false);
      handleBrowseClose();
    },
    [items],
  );

  const handleGoogleOnChange = useCallback(
    data => {
      if (data.action === 'picked') {
        setItems([
          ...items,
          ..._.map(data.docs, doc => ({
            uid: doc.id,
            isInternal: false,
            fileName: doc.name,
            mimeType: doc.mimeType,
            createdDate: doc.lastEditedUtc,
            webViewLink: doc.url,
            thumbGalleryUrl: doc.iconUrl,
            externalSource: 'GoogleDrive',
          })),
        ]);
      }
    },
    [items],
  );

  const handleOneDriveSuccess = useCallback(
    files => {
      setItems([
        ...items,
        ..._.map(files.value, file => ({
          uid: file.id,
          isInternal: false,
          fileName: file.name,
          mimeType: file.file.mimeType,
          createdDate: file.createdDateTime,
          webViewLink: '',
          thumbGalleryUrl: _.head(file.thumbnails).medium.url,
          externalSource: 'OneDrive',
        })),
      ]);
    },
    [items],
  );

  const { CancelToken } = axios;
  const cancelTokens = useRef([]);

  useEffect(
    () => () => {
      dispatchCleanUploadFile(id);
    },
    [],
  );

  const messagesRef = useRef([]);
  const [messages, setMessages] = useState([]);

  const handleOnDrop = useCallback(
    files => {
      cancelTokens.current = [];
      setFileCount(fileCount + _.size(files));
      dispatchDisablePublish();
      _.map(files, file => {
        const source = CancelToken.source();
        const formData = new FormData();
        const tempUid = uuidv4();
        formData.append('fileName', file.name);
        formData.append('file', file);
        dispatchUploadFile(id, tempUid, formData, {
          cancelToken: source.token,
        });
        cancelTokens.current.push({
          tempUid,
          fileName: file.name,
          uploading: true,
          ...source,
        });
      });
      setItems([...items, ...cancelTokens.current]);
    },
    [id, items, setItems, fileCount],
  );

  const handleUploadCancel = useCallback(
    async uid => {
      try {
        await confirm({
          description: 'Are you sure, you want to delete this?',
        });
        _.find(items, { tempUid: uid }).cancel();
        setItems(_.filter(items, ({ tempUid }) => tempUid !== uid));
        setFileCount(fileCount - 1);
      } catch {
        return false;
      }
      return false;
    },
    [items, fileCount],
  );

  const handleDelete = useCallback(
    async uid => {
      try {
        await confirm({
          description: 'Are you sure, you want to delete this?',
        });
        setItems(_.filter(items, item => item.uid !== uid));
      } catch {
        return false;
      }
      return false;
    },
    [items],
  );

  const handleMessageClose = message =>
    setMessages(_.without(messages, message));

  useEffect(() => {
    if (!_.isEmpty(uploadedFile)) {
      const tempItems = [...items];
      messagesRef.current = messages;
      _.map(uploadedFile, file => {
        const index = _.indexOf(
          tempItems,
          _.find(tempItems, { tempUid: file.tempUid }),
        );
        if (index > -1) {
          if (file.message === 'File name is duplicate') {
            messagesRef.current.push(file.fileName);
          }
          _.set(tempItems, index, {
            uid: file.uid,
            isInternal: true,
            fileName: file.fileName,
            mimeType: file.fileType,
            createdDate: file.createdDate || file.uploadedDate,
            webViewLink: file.url,
            thumbGalleryUrl: file.thumbGalleryUrl,
            externalSource: '',
          });
        }
      });
      setMessages(messagesRef.current);
      setItems(tempItems);
    }
    if (_.size(uploadedFile) === fileCount) {
      dispatchEnablePublish();
    }
  }, [uploadedFile]);

  const handleSort = useCallback(
    (oldIndex, newIndex) => {
      setItems(arrayMove(items, oldIndex, newIndex));
    },
    [items],
  );

  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>*</Grid>
        <Grid item xs zeroMinWidth>
          <Paper
            elevation={0}
            style={{
              backgroundColor: '#eceeef',
              padding: 10,
              paddingRight: 44,
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Close fontSize="small" />
            </IconButton>
            <SortableList
              items={items}
              axis="xy"
              onSortEnd={({ oldIndex, newIndex }) =>
                handleSort(oldIndex, newIndex)
              }
              lockToContainerEdges
              helperClass="sortableHelper"
              pressDelay={200}
              type={type}
              handleBrowseOpen={handleBrowseOpen}
              browseAnchorEl={browseAnchorEl}
              handleBrowseClose={handleBrowseClose}
              handleBrowseAllOpen={handleBrowseAllOpen}
              handleGoogleOnChange={handleGoogleOnChange}
              handleOneDriveSuccess={handleOneDriveSuccess}
              handleOnDrop={handleOnDrop}
              handleUploadCancel={handleUploadCancel}
              handleEdit={handleFileDetailsOpen}
              handleDelete={handleDelete}
            />
          </Paper>
        </Grid>
      </Grid>
      {browseAllOpen && (
        <BrowseAll
          open={browseAllOpen}
          onClose={handleBrowseAllClose}
          onOk={handleBrowseAllOk}
          type={type}
        />
      )}
      {fileDetailsOpen && (
        <FileDetails
          open={fileDetailsOpen}
          fileUid={fileUid}
          handleClose={() => setFileDetailsOpen(false)}
        />
      )}
      {messages &&
        _.map(messages, message => (
          <MessageDialog
            key={message}
            fileName={message}
            handleClose={() => handleMessageClose(message)}
          />
        ))}
    </>
  );
}

DocumentBlock.propTypes = {
  type: PropTypes.string,
  dispatchUploadFile: PropTypes.func,
  dispatchCleanUploadFile: PropTypes.func,
  uploadedFile: PropTypes.array,
  items: PropTypes.array,
  setItems: PropTypes.func,
  handleClose: PropTypes.func,
  dispatchEnablePublish: PropTypes.func,
  dispatchDisablePublish: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    uploadedFile: makeSelectUploadFile(ownProps.id),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: (id, tempUid, options, config) =>
      dispatch(uploadFile(id, tempUid, options, config)),
    dispatchCleanUploadFile: id => dispatch(cleanUploadFile(id)),
    dispatchEnablePublish: () => dispatch(enablePublish()),
    dispatchDisablePublish: () => dispatch(disablePublish()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DocumentBlock);
