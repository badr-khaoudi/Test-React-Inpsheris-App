/* eslint-disable no-nested-ternary */
/**
 *
 * LivelyTransfer
 *
 */

import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import { useSnackbar } from 'notistack';
import {
  AppBar,
  Toolbar,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  ListItemText,
  List,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Close, Delete } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { DocumentIcons } from 'components/Icons';
import {
  makeSelectReceivedUserUids,
  makeSelectDocuments,
} from 'containers/AuthBase/selectors';
import {
  closeLivelyTransfer,
  deleteLivelyTransferDocuments,
  openDocumentBar,
} from 'containers/AuthBase/actions';
import UserAutocomplete from 'containers/UserAutocomplete';
import {
  makeSelectTransferDocumentSuccess,
  makeSelectTransferDocumentLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { uploadFile, transferDocument, cleanLivelyTransfer } from './actions';
import { LivelyTransferSchema } from './Schema';

const Header = () => (
  <div
    style={{
      display: 'flex',
      padding: '8px 48px 8px 16px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      alignItems: 'center',
    }}
  >
    <div style={{ flex: 1, paddingRight: 16 }}>
      <Typography variant="h6" style={{ fontSize: '1rem' }}>
        Nom
      </Typography>
    </div>
    <div style={{ width: 150 }}>
      <Typography variant="h6" style={{ fontSize: '1rem' }}>
        Mis à jour le
      </Typography>
    </div>
  </div>
);

const transformDocuments = document => ({
  uid: document.uid,
  isInternal: document.isInternal,
  fileName: document.fileName,
  mimeType: document.mimeType || document.fileType,
  createdDate: document.createdDate || document.uploadedDate,
  webViewLink: document.path,
  externalSource: document.externalSource,
});

const Item = memo(
  ({
    fileName,
    mimeType,
    fileType,
    createdDate,
    uploadedDate,
    handleDelete,
    uid,
    uuid,
    cancelToken,
  }) => (
    <ListItem
      button
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <ListItemIcon>
        {uid ? (
          <DocumentIcons type={mimeType || fileType} />
        ) : (
          <CircularProgress style={{ height: 24, width: 24 }} />
        )}
      </ListItemIcon>
      <ListItemText
        primary={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, paddingRight: 16 }}>
              <Typography style={{ fontSize: '1rem', wordBreak: 'break-word' }}>
                {fileName}
              </Typography>
            </div>
            {createdDate ? (
              <div style={{ width: 150 }}>
                <Typography style={{ fontSize: '1rem' }}>
                  {moment(createdDate).format('LL')}
                </Typography>
              </div>
            ) : uploadedDate ? (
              <div style={{ width: 150 }}>
                <Typography style={{ fontSize: '1rem' }}>
                  {moment(createdDate).format('LL')}
                </Typography>
              </div>
            ) : null}
          </div>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={() => handleDelete(_.pickBy({ uid, uuid }), cancelToken)}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ),
);

Item.propTypes = {
  fileName: PropTypes.string,
  mimeType: PropTypes.string,
  fileType: PropTypes.string,
  createdDate: PropTypes.string,
  uploadedDate: PropTypes.string,
  handleDelete: PropTypes.func,
  uid: PropTypes.string,
  uuid: PropTypes.string,
  cancelToken: PropTypes.object,
};

export function LivelyTransfer() {
  useInjectReducer({ key: 'livelyTransfer', reducer });
  useInjectSaga({ key: 'livelyTransfer', saga });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const userUids = useSelector(makeSelectReceivedUserUids());
  const documents = useSelector(makeSelectDocuments());
  const transferDocumentSuccess = useSelector(
    makeSelectTransferDocumentSuccess(),
  );
  const transferDocumentLoading = useSelector(
    makeSelectTransferDocumentLoading(),
  );

  const [receivedUserUids, setReceivedUserUids] = useState(() => userUids);
  const [isSendMail, setIsSendMail] = useState(false);
  const [isSendPrivateMessage, setIsSendPrivateMessage] = useState(true);
  const [title, setTitle] = useState('');

  const handleOnDrop = useCallback(files => {
    _.forEach(files, file => {
      const source = axios.CancelToken.source();
      const uuid = uuidv4();
      const formData = new FormData();
      formData.append('fileName', file.name);
      formData.append('file', file);
      dispatch(uploadFile({ uuid, fileName: file.name }, formData, source));
    });
  }, []);

  const handleDelete = useCallback((file, cancelToken) => {
    if (!file.uid) {
      cancelToken.cancel();
    }
    dispatch(deleteLivelyTransferDocuments(file));
  }, []);

  const handleSend = () => {
    const payload = {
      receivedUserUids: _.map(receivedUserUids, ({ uid }) => uid),
      documents: _.map(documents, transformDocuments),
      isSendMail,
      isSendPrivateMessage,
      title,
    };
    const result = LivelyTransferSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatch(transferDocument(payload));
    }
  };

  useEffect(() => {
    if (transferDocumentSuccess) {
      dispatch(closeLivelyTransfer());
    }
    return () => dispatch(cleanLivelyTransfer());
  }, [transferDocumentSuccess]);

  return (
    <Dialog
      open
      onClose={() => dispatch(closeLivelyTransfer())}
      keepMounted={false}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
    >
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Lively Transfer
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => dispatch(closeLivelyTransfer())}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <UserAutocomplete
              userUids={receivedUserUids}
              setUserUids={setReceivedUserUids}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSendMail}
                  onChange={e => setIsSendMail(e.target.checked)}
                  color="primary"
                />
              }
              label="Envoyer sur la boite mail"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isSendPrivateMessage}
                  onChange={e => setIsSendPrivateMessage(e.target.checked)}
                  color="primary"
                />
              }
              label="Envoyer par message privé"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={4}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>
          <Dropzone
            onDrop={handleOnDrop}
            accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel.sheet.macroEnabled.12, application/pdf, application/zip, application/gzip, application/x-7z-compressed, application/vnd.sqlite3, application/x-sqlite3, image/png, image/jpg, image/gif, image/jpeg"
          >
            {({ getRootProps, getInputProps }) => (
              <Grid item {...getRootProps()}>
                <input {...getInputProps()} />
                <Button variant="outlined" color="primary">
                  Importer à partir de l’ordinateur
                </Button>
              </Grid>
            )}
          </Dropzone>
          <Grid item>
            <Button
              onClick={() => dispatch(openDocumentBar({ allowSelect: true }))}
              variant="outlined"
              color="primary"
            >
              Importer à partir de la plateforme
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Documents sélectionnés
            </Typography>
            {_.isEmpty(documents) ? (
              <Typography>Aucun fichier ajouté</Typography>
            ) : (
              <>
                <Header />
                <List>
                  {_.map(documents, (document, index) => (
                    <Item
                      key={`${document.uid || document.uuid}${index}`}
                      {...document}
                      handleDelete={handleDelete}
                    />
                  ))}
                </List>
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSend}
          variant="outlined"
          color="primary"
          disabled={transferDocumentLoading}
        >
          Envoyer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LivelyTransfer.propTypes = {};

export default memo(LivelyTransfer);
