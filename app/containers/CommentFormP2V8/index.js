/**
 *
 * CommentFormP2V8
 *
 */

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import {
  Image,
  Folder,
  Videocam,
  InsertLink,
  Close,
  InsertEmoticon,
  Send,
} from '@material-ui/icons';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import VideoBlock from 'containers/VideoBlock/Loadable';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import LinkBlock from 'components/LinkBlock/Loadable';
import { RoundButton } from 'components/CommentP2V8/Wrapper';
import { makeSelectCommentSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { CommentSchema } from './Schema';
import { comment as commentAction, resetComment, commentEdit } from './actions';
import './style.scss';

const Item = ({ entity: { colons, native } }) => (
  <div>{`${colons} ${native}`}</div>
);

Item.propTypes = {
  entity: PropTypes.object,
};

const UserItem = ({ entity: { uid, displayName }, handleUserItem }) => (
  <div
    role="button"
    tabIndex="0"
    onKeyPress={() => handleUserItem(uid, displayName)}
    onClick={() => {
      handleUserItem(uid, displayName);
    }}
  >
    {displayName}
  </div>
);

UserItem.propTypes = {
  entity: PropTypes.object,
  handleUserItem: PropTypes.func,
};

const userSuggestions = async token => {
  const { data } = await axios.get('api/user/suggestion', {
    params: { q: token },
  });
  return _.slice(data, 0, 7);
};

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 56,
    },
    '& .MuiInputBase-input': {
      paddingLeft: 24,
    },
  },
}));

const CommentTextField = React.forwardRef((props, ref) => {
  const classes = useStyles();
  return (
    <TextField
      color="secondary"
      variant="outlined"
      fullWidth
      {...props}
      inputRef={ref}
      className={classes.root}
    />
  );
});

export function CommentFormP2V8(props) {
  useInjectReducer({ key: 'commentFormP2V8', reducer });
  useInjectSaga({ key: 'commentFormP2V8', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    comment,
    content,
    dispatchComment,
    handleClose,
    commentSuccess,
    dispatchResetComment,
    dispatchCommentEdit,
    followerQuickpostUid,
  } = props;

  const [textDetail, setTextDetail] = useState([]);
  const [parseText, setParseText] = useState('');
  const [images, setImages] = useState(undefined);
  const [documents, setDocuments] = useState(undefined);
  const [videos, setVideos] = useState(undefined);
  const [links, setLinks] = useState(undefined);
  const [focused, setFocused] = useState(false);

  const handleUserItem = (uid, displayName) => {
    setTextDetail([...textDetail, { k: uid, v: displayName }]);
  };

  const textAreaRef = useRef(null);

  const handleEmojiPicker = native => {
    const caretPosition = textAreaRef.current.getCaretPosition();
    setParseText(
      `${parseText.slice(0, caretPosition)}${native}${parseText.slice(
        caretPosition,
      )}`,
    );
    setTimeout(() => {
      textAreaRef.current.setCaretPosition(caretPosition + 2);
    }, 0);
  };

  const [pickerAnchorEl, setPickerAnchorEl] = useState(null);

  useEffect(() => {
    if (comment) {
      setTextDetail(comment.textDetail);
      setParseText(comment.text);
      if (comment.images) {
        setImages(comment.images);
      }
      if (comment.documents) {
        setDocuments(comment.documents);
      }
      if (comment.videos) {
        setVideos(comment.videos);
      }
      if (comment.links) {
        setLinks(_.map(comment.links, link => ({ id: uuidv4(), ...link })));
      }
    }
  }, [comment]);

  const handlePublish = () => {
    const payload = {
      content,
      followerQuickpostUid,
      images: images ? _.map(images, image => transformImage(image)) : images,
      documents: documents
        ? _.map(documents, document => transformDocument(document))
        : documents,
      videos: videos ? _.map(videos, video => transformVideo(video)) : videos,
      links: links ? _.map(links, link => transformLink(link)) : links,
      language: 'French',
      text: parseText,
      textDetail: JSON.stringify(
        _.filter(textDetail, text => _.includes(parseText, text.v)),
      )
        .replace('[', '')
        .replace(']', '')
        .replace(/{/g, '@[')
        .replace(/}/g, ']')
        .replace(/"/g, '')
        .replace(/:/g, '='),
    };
    const result = CommentSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      if (comment) {
        dispatchCommentEdit({
          ...payload,
          commentUid: comment.uid,
        });
      } else {
        dispatchComment(payload);
      }
    }
  };

  useEffect(() => {
    if (commentSuccess) {
      setTextDetail('');
      setParseText('');
      setImages(undefined);
      setDocuments(undefined);
      setVideos(undefined);
      setLinks(undefined);
      if (handleClose) {
        handleClose();
      }
      dispatchResetComment();
    }
  }, [commentSuccess]);

  const handleBlur = useCallback(_.debounce(() => setFocused(false), 2000), []);

  useEffect(() => () => handleBlur.cancel(), [handleBlur]);

  const handleMouseEnter = () => {
    handleBlur.cancel();
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <ReactTextareaAutocomplete
            trigger={{
              ':': {
                dataProvider: token => emojiIndex.search(token).slice(0, 7),
                component: Item,
                output: item => item.native,
              },
              '@': {
                dataProvider: token => userSuggestions(token),
                component: allProps => (
                  <UserItem {...allProps} handleUserItem={handleUserItem} />
                ),
                output: user => `@${user.displayName}`,
              },
            }}
            loadingComponent={() => null}
            dropdownStyle={{ zIndex: 1 }}
            textAreaComponent={CommentTextField}
            ref={textAreaRef}
            movePopupAsYouType
            value={parseText}
            onChange={e => setParseText(e.target.value)}
            placeholder="Write a comment here..."
            InputProps={{
              endAdornment: [
                <InputAdornment key="InsertEmoticon">
                  <IconButton
                    onClick={e => {
                      setPickerAnchorEl(e.currentTarget);
                      setFocused(true);
                    }}
                  >
                    <InsertEmoticon />
                  </IconButton>
                </InputAdornment>,
                <InputAdornment key="Send">
                  <IconButton onClick={handlePublish} edge="end">
                    <Send />
                  </IconButton>
                </InputAdornment>,
              ],
            }}
            autoFocus={!!comment}
            onFocus={() => {
              setFocused(true);
              handleBlur.cancel();
            }}
            onBlur={() => {
              if (pickerAnchorEl) {
                return;
              }
              handleBlur();
            }}
          />
        </Grid>
        {(focused || (images || documents || videos || links)) && (
          <Grid item xs={12} onMouseEnter={handleMouseEnter}>
            <RoundButton
              onClick={() => {
                if (!images) {
                  setImages([]);
                }
              }}
            >
              <Image fontSize="small" />
            </RoundButton>
            <RoundButton
              onClick={() => {
                if (!documents) {
                  setDocuments([]);
                }
              }}
            >
              <Folder fontSize="small" />
            </RoundButton>
            <RoundButton
              onClick={() => {
                if (!videos) {
                  setVideos([]);
                }
              }}
            >
              <Videocam fontSize="small" />
            </RoundButton>
            <RoundButton
              onClick={() => {
                if (!links) {
                  setLinks([]);
                }
              }}
            >
              <InsertLink fontSize="small" />
            </RoundButton>
          </Grid>
        )}
        {(images || documents || videos || links) && (
          <Grid item xs={12}>
            <Paper variant="outlined" style={{ padding: 8 }}>
              <Grid container justify="flex-end">
                <Grid item>
                  <IconButton
                    onClick={() => {
                      setImages(undefined);
                      setDocuments(undefined);
                      setVideos(undefined);
                      setLinks(undefined);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
              {images && (
                <DocumentBlock
                  type="Images"
                  id="comment-images"
                  items={images}
                  setItems={setImages}
                  handleClose={() => setImages(undefined)}
                />
              )}
              {documents && (
                <DocumentBlock
                  type="Documents"
                  id="comment-documents"
                  items={documents}
                  setItems={setDocuments}
                  handleClose={() => setDocuments(undefined)}
                />
              )}
              {videos && (
                <VideoBlock
                  videos={videos}
                  setVideos={setVideos}
                  handleClose={() => setVideos(undefined)}
                />
              )}
              {links && (
                <LinkBlock
                  links={links}
                  setLinks={setLinks}
                  handleClose={() => setLinks(undefined)}
                />
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
      <Popover
        open={Boolean(pickerAnchorEl)}
        anchorEl={pickerAnchorEl}
        onClose={() => setPickerAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Picker
          native
          showPreview={false}
          showSkinTones={false}
          useButton={false}
          title={null}
          onSelect={({ native }) => handleEmojiPicker(native)}
        />
      </Popover>
    </>
  );
}

CommentFormP2V8.propTypes = {
  comment: PropTypes.object,
  content: PropTypes.string,
  dispatchComment: PropTypes.func,
  handleClose: PropTypes.func,
  commentSuccess: PropTypes.bool,
  dispatchResetComment: PropTypes.func,
  dispatchCommentEdit: PropTypes.func,
  followerQuickpostUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  commentSuccess: makeSelectCommentSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchComment: options => dispatch(commentAction(options)),
    dispatchResetComment: () => dispatch(resetComment()),
    dispatchCommentEdit: options => dispatch(commentEdit(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommentFormP2V8);
