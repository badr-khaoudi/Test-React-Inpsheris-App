/**
 *
 * DirectoryPrivateMessage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close, Videocam, Folder, Image, InsertLink } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import VideoBlock from 'containers/VideoBlock/Loadable';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import LinkBlock from 'components/LinkBlock/Loadable';
import Hashtag from 'containers/Hashtag/Loadable';
import { closeDirectoryPrivateMessage } from 'containers/AuthBase/actions';
import { makeSelectFollowedUser } from 'containers/AuthBase/selectors';
import { makeSelectPrivateMessageSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { DirectoryPrivateMessageSchema } from './Schema';
import { privateMessage, cleanPrivateMessage } from './actions';
// import messages from './messages';

const id = uuidv4();

export function DirectoryPrivateMessage(props) {
  useInjectReducer({ key: 'directoryPrivateMessage', reducer });
  useInjectSaga({ key: 'directoryPrivateMessage', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    followedUser,
    dispatchPrivateMessage,
    privateMessageSuccess,
    dispatchCleanPrivateMessage,
    dispatchCloseDirectoryPrivateMessage,
  } = props;

  const [quickpostDescription, setQuickpostDescription] = useState('');
  const [type, setType] = useState(undefined);
  const [block, setBlock] = useState(undefined);
  const [items, setItems] = useState([]);
  const [hashtag, setHashtag] = useState([]);

  useEffect(() => {
    setItems([]);
  }, [type]);

  useEffect(() => {
    if (privateMessageSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCleanPrivateMessage();
      dispatchCloseDirectoryPrivateMessage();
    }
  }, [privateMessageSuccess]);

  const handleSend = () => {
    let tempItems;
    if (block === 'links') {
      tempItems = _.map(items, item => transformLink(item));
    }
    if (block === 'documents') {
      tempItems = _.map(items, item => transformDocument(item));
    }
    if (block === 'images') {
      tempItems = _.map(items, item => transformImage(item));
    }
    if (block === 'videos') {
      tempItems = _.map(items, item => transformVideo(item));
    }
    const payload = {
      followedUserUid: followedUser.uid,
      language: 'fr',
      quickpostDescription,
      hashtag: hashtag.join(', '),
      type,
      [block]: block ? tempItems : block,
    };
    const result = DirectoryPrivateMessageSchema.validate({
      quickpostDescription,
      type,
      items,
    });
    if (result.error) {
      _.map(result.error.details, error =>
        enqueueSnackbar(error.message, {
          variant: 'error',
        }),
      );
    }
    if (!result.error) {
      dispatchPrivateMessage(payload);
    }
  };

  useCloseEffect(dispatchCloseDirectoryPrivateMessage);

  return (
    <Dialog
      open={open}
      onClose={dispatchCloseDirectoryPrivateMessage}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Private Message
        <IconButton
          aria-label="close"
          onClick={dispatchCloseDirectoryPrivateMessage}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              placeholder={`Write on wall of ${followedUser.displayName}`}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              value={quickpostDescription}
              onChange={e => setQuickpostDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <IconButton
                  onClick={() => {
                    setType('video');
                    setBlock('videos');
                  }}
                >
                  <Videocam fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    setType('file');
                    setBlock('documents');
                  }}
                >
                  <Folder fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    setType('file');
                    setBlock('images');
                  }}
                >
                  <Image fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => {
                    setType('link');
                    setBlock('links');
                  }}
                >
                  <InsertLink fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Hashtag hashtag={hashtag} setHashtag={setHashtag} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {block === 'videos' && (
              <>
                <Typography variant="h6">Add videos</Typography>
                <VideoBlock
                  videos={items}
                  setVideos={setItems}
                  handleClose={() => {
                    setType(undefined);
                    setBlock(undefined);
                  }}
                />
              </>
            )}
            {block === 'documents' && (
              <>
                <Typography variant="h6">Add Documents</Typography>
                <DocumentBlock
                  type="Documents"
                  id={id}
                  items={items}
                  setItems={setItems}
                  handleClose={() => {
                    setType(undefined);
                    setBlock(undefined);
                  }}
                />
              </>
            )}
            {block === 'images' && (
              <>
                <Typography variant="h6">Add Images</Typography>
                <DocumentBlock
                  type="Images"
                  id={id}
                  items={items}
                  setItems={setItems}
                  handleClose={() => {
                    setType(undefined);
                    setBlock(undefined);
                  }}
                />
              </>
            )}
            {block === 'links' && (
              <>
                <Typography variant="h6">Add embedded links</Typography>
                <LinkBlock
                  links={items}
                  setLinks={setItems}
                  handleClose={() => {
                    setType(undefined);
                    setBlock(undefined);
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSend} variant="outlined" color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DirectoryPrivateMessage.propTypes = {
  open: PropTypes.bool,
  followedUser: PropTypes.object,
  dispatchCloseDirectoryPrivateMessage: PropTypes.func,
  dispatchPrivateMessage: PropTypes.func,
  privateMessageSuccess: PropTypes.bool,
  dispatchCleanPrivateMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  privateMessageSuccess: makeSelectPrivateMessageSuccess(),
  followedUser: makeSelectFollowedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchPrivateMessage: options => dispatch(privateMessage(options)),
    dispatchCleanPrivateMessage: () => dispatch(cleanPrivateMessage()),
    dispatchCloseDirectoryPrivateMessage: () =>
      dispatch(closeDirectoryPrivateMessage()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DirectoryPrivateMessage);
