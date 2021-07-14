/**
 *
 * CommentArea
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Image, Folder, Videocam, InsertLink, Close } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import TextareaAutocomplete from 'components/TextareaAutocomplete/Loadable';
import VideoBlock from 'containers/VideoBlock/Loadable';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import LinkBlock from 'components/LinkBlock/Loadable';
import { makeSelectCommentSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { CommentSchema } from './Schema';
import { comment as commentAction, resetComment, commentEdit } from './actions';

export function CommentArea(props) {
  useInjectReducer({ key: 'commentArea', reducer });
  useInjectSaga({ key: 'commentArea', saga });

  const {
    currentUser,
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

  useEffect(() => {
    if (comment !== undefined) {
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

  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => () => dispatchResetComment(), []);

  useEffect(() => {
    if (commentSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      setTextDetail('');
      setParseText('');
      setImages(undefined);
      setDocuments(undefined);
      setVideos(undefined);
      setLinks(undefined);
      if (handleClose) {
        handleClose();
      }
    }
  }, [commentSuccess]);

  return (
    <div>
      <Grid item xs={12}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Avatar src={currentUser.headerLogoUrl}>
              {initials(currentUser.displayName)}
            </Avatar>
          </Grid>
          <Grid item xs={12} zeroMinWidth>
            <TextareaAutocomplete
              parseText={parseText}
              setParseText={setParseText}
              textDetail={textDetail}
              setTextDetail={setTextDetail}
              rows={2}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs>
            <IconButton
              onClick={() => {
                setImages([]);
              }}
            >
              <Image fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                setDocuments([]);
              }}
            >
              <Folder fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                setVideos([]);
              }}
            >
              <Videocam fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                setLinks([]);
              }}
            >
              <InsertLink fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item>
            <Button variant="outlined" size="small" onClick={handlePublish}>
              Publish
            </Button>
          </Grid>
        </Grid>
        {(images !== undefined ||
          documents !== undefined ||
          videos !== undefined ||
          links !== undefined) && (
          <Paper
            variant="outlined"
            square
            style={{ padding: 8, backgroundColor: '#f5f6f6' }}
          >
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
            {images !== undefined && (
              <DocumentBlock
                type="Images"
                id="comment-images"
                items={images}
                setItems={setImages}
                handleClose={() => setImages(undefined)}
              />
            )}
            {documents !== undefined && (
              <DocumentBlock
                type="Documents"
                id="comment-documents"
                items={documents}
                setItems={setDocuments}
                handleClose={() => setDocuments(undefined)}
              />
            )}
            {videos !== undefined && (
              <VideoBlock
                videos={videos}
                setVideos={setVideos}
                handleClose={() => setVideos(undefined)}
              />
            )}
            {links !== undefined && (
              <LinkBlock
                links={links}
                setLinks={setLinks}
                handleClose={() => setLinks(undefined)}
              />
            )}
          </Paper>
        )}
      </Grid>
    </div>
  );
}

CommentArea.propTypes = {
  currentUser: PropTypes.object,
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
  currentUser: makeSelectCurrentUser(),
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
)(CommentArea);
