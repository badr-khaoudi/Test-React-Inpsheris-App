/* eslint-disable indent */
/**
 *
 * Paragraph
 *
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import arrayMove from 'array-move';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Divider,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  Close,
  Description,
  Image,
  Videocam,
  Folder,
  Event,
  MoreHoriz,
} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import reducer from 'containers/ContentCreation/reducer';
import saga from 'containers/ContentCreation/saga';
// import messages from './messages';
import SortableBlockList from 'components/SortableBlockList/Loadable';
import {
  BlockTypes,
  BlockItem,
  BlockButton,
  ItemImage,
} from 'containers/ContentCreation/Wrapper';
import { SimpleMenu } from 'containers/Feed/Wrapper';
import { imageDimensions } from 'containers/ContentCreation/imageDimensions';
import ImageCrop from 'containers/ImageCrop/Loadable';
import { uploadFile } from 'containers/ContentCreation/actions';
import { makeSelectUploadFile } from 'containers/ContentCreation/selectors';
import { ParagraphSchema } from './Schema';

export function Paragraph(props) {
  useInjectReducer({ key: 'contentCreation', reducer });
  useInjectSaga({ key: 'contentCreation', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    grandArticlePage,
    setGrandArticlePage,
    handleClose,
    dispatchUploadFile,
    uploadedFiles,
  } = props;

  const [page, setPage] = useState({
    id: uuidv4(),
    subTitle: '',
    title: '',
    blocks: [
      { subTitle: '', title: '', type: 'heading' },
      { uid: uuidv4(), content: '', type: 'richText' },
    ],
  });

  const [itemImage, setItemImage] = useState({});

  useEffect(() => {
    if (!_.isEmpty(grandArticlePage)) {
      const pageHeading = _.find(grandArticlePage.blocks, { type: 'heading' });
      setItemImage({
        uid: pageHeading.uid,
        url: pageHeading.path,
        imageHeader: `${pageHeading.imageHeader}/?t=${moment().format('x')}`,
      });
      const { imageHeader, ...rest } = grandArticlePage;
      setPage(rest);
    }
  }, []);

  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [imageCropOpen, setImageCropOpen] = useState(false);

  const handleOnDrop = (id, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(id, formData);
    setImageCropOpen(true);
  };

  const handleRemove = useCallback(
    uid => {
      setPage({
        ...page,
        blocks: _.filter(page.blocks, block => block.uid !== uid),
      });
    },
    [page],
  );

  const onChangeCKEditor = useCallback(
    (uid, data) => {
      setPage({
        ...page,
        blocks: _.map(page.blocks, block =>
          block.uid && block.uid === uid
            ? { ...block, content: data, modifiedBlock: true }
            : block,
        ),
      });
    },
    [page],
  );

  const handleBlockChange = useCallback(
    (uid, type, items) => {
      setPage({
        ...page,
        blocks: _.map(page.blocks, block =>
          block.uid === uid ? { ...block, [type]: items } : block,
        ),
      });
    },
    [page],
  );

  const handleSort = useCallback(
    (oldIndex, newIndex) => {
      setPage({
        ...page,
        blocks: arrayMove(page.blocks, oldIndex, newIndex),
      });
    },
    [page],
  );

  const addTextBlock = () => {
    setPage({
      ...page,
      blocks: [
        ...page.blocks,
        { uid: uuidv4(), content: '', type: 'richText' },
      ],
    });
  };

  const addVideoBlock = () => {
    setPage({
      ...page,
      blocks: [
        ...page.blocks,
        { uid: uuidv4(), videos: [], type: 'videoGallery' },
      ],
    });
  };

  const addImageBlock = () => {
    setPage({
      ...page,
      blocks: [
        ...page.blocks,
        { uid: uuidv4(), images: [], type: 'ImageGallery' },
      ],
    });
  };

  const addDocumentBlock = () => {
    setPage({
      ...page,
      blocks: [
        ...page.blocks,
        { uid: uuidv4(), documents: [], type: 'documentGallery' },
      ],
    });
  };

  const addLinkBlock = () => {
    setPage({
      ...page,
      blocks: [...page.blocks, { uid: uuidv4(), links: [], type: 'linkEmbed' }],
    });
  };

  const addEventBlock = () => {
    setPage({
      ...page,
      blocks: [
        ...page.blocks,
        {
          uid: uuidv4(),
          conferenceSolutionType: 'HangoutsMeet',
          dateFrom: null,
          dateTo: null,
          description: '',
          googleCalendarPersonalInvitationEmails: '',
          invitedPeopleUids: [],
          isActivateDoNotParticipate: false,
          isAssociateConferenceCall: false,
          isSendGoogleCalendarInvitation: false,
          isSendGoogleCalendarPersonalInvitation: false,
          limitSeatOfEvent: false,
          location: '',
          modifiedBlock: false,
          participateEventExtension: true,
          title: '',
          totalNumberOfSeat: 1,
          totalNumberOfWaitingSeat: 0,
          type: 'event',
        },
      ],
    });
  };

  const handleHeadingChange = e => {
    setPage({
      ...page,
      [e.target.name]: e.target.value,
      blocks: _.map(page.blocks, block =>
        block.type === 'heading'
          ? { ...headingBlock, [e.target.name]: e.target.value }
          : block,
      ),
    });
  };

  const handleImageCrop = useCallback(
    cropImage => {
      setItemImage({
        ...cropImage,
        url: cropImage.urls[0],
        imageHeader: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
      });
      setPage({
        ...page,
        blocks: _.map(page.blocks, block =>
          block.type === 'heading'
            ? {
                ...headingBlock,
                headerImageColor: 'rgba(0, 0, 0, 0)',
                imageGridviewSmallThumb: cropImage.urls[1],
                imageGridviewSmallThumbAngle: 0,
                imageGridviewSmallThumbBackgroundColor: 'transparent',
                imageGridviewSmallThumbPosX: 0,
                imageGridviewSmallThumbPosY: 0,
                imageGridviewThumb: cropImage.urls[2],
                imageGridviewThumbAngle: 0,
                imageGridviewThumbBackgroundColor: 'transparent',
                imageGridviewThumbPosX: 0,
                imageGridviewThumbPosY: 0,
                imageHeader: cropImage.urls[1],
                imageHeaderAngle: 0,
                imageHeaderBackgroundColor: 'transparent',
                imageHeaderPosX: 0,
                imageHeaderPosY: 0,
                smallImage: false,
              }
            : block,
        ),
      });
    },
    [page, headingBlock],
  );

  const removeHeaderImage = () => {
    setItemImage({});
    setPage({
      ...page,
      blocks: _.map(page.blocks, block =>
        block.type === 'heading'
          ? {
              imageHeader: undefined,
              subTitle: page.subTitle,
              title: page.title,
              type: 'heading',
            }
          : block,
      ),
    });
  };

  const handleAdd = () => {
    const result = ParagraphSchema.validate(page);
    if (result.error) {
      const { path } = _.head(result.error.details);
      if (_.size(path) === 1) {
        return enqueueSnackbar(path, {
          variant: 'error',
        });
      }
      enqueueSnackbar(_.get(page, path).type, {
        variant: 'error',
      });
    }
    if (!result.error) {
      setGrandArticlePage(page);
      handleClose();
    }
    return null;
  };

  const headingBlock = useMemo(() => _.find(page.blocks, { type: 'heading' }), [
    page,
  ]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          Add Paragraph
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="title"
                    value={page.title}
                    onChange={handleHeadingChange}
                    inputProps={{ maxLength: 110 }}
                  />
                  <Grid container justify="flex-end">
                    <FormHelperText>
                      {110 - page.title.length} characters left
                    </FormHelperText>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Subtitle"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="subTitle"
                    value={page.subTitle}
                    onChange={handleHeadingChange}
                  />
                </Grid>
                <Grid item xs={12} style={{ zIndex: 1301 }}>
                  <SortableBlockList
                    items={page.blocks}
                    axis="xy"
                    onSortEnd={({ oldIndex, newIndex }) =>
                      handleSort(oldIndex, newIndex)
                    }
                    lockToContainerEdges
                    helperClass="sortableHelper"
                    pressDelay={200}
                    shouldCancelStart={e =>
                      _.includes(e.srcElement.classList, 'MuiSelect-root') ||
                      _.includes(e.srcElement.classList, 'MuiSvgIcon-root') ||
                      _.includes(
                        e.srcElement.classList,
                        'MuiButtonBase-root',
                      ) ||
                      _.includes(e.srcElement.classList, 'cke_resizer')
                    }
                    onChangeCKEditor={onChangeCKEditor}
                    handleBlockChange={handleBlockChange}
                    handleRemove={handleRemove}
                  />
                </Grid>
                <Grid item xs={12}>
                  <BlockTypes elevation={0}>
                    <Grid container>
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton onClick={addTextBlock}>
                            <Description />
                            Text
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton onClick={addImageBlock}>
                            <Image />
                            Images
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton onClick={addVideoBlock}>
                            <Videocam />
                            Videos
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton onClick={addDocumentBlock}>
                            <Folder />
                            Documents
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton onClick={addEventBlock}>
                            <Event />
                            Event
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs>
                        <BlockItem>
                          <BlockButton
                            onClick={e => setMoreAnchorEl(e.currentTarget)}
                          >
                            <MoreHoriz />
                            More
                          </BlockButton>
                        </BlockItem>
                      </Grid>
                      <SimpleMenu
                        elevation={0}
                        anchorEl={moreAnchorEl}
                        open={Boolean(moreAnchorEl)}
                        onClose={() => setMoreAnchorEl(null)}
                      >
                        <MenuItem
                          dense
                          onClick={() => {
                            setMoreAnchorEl(null);
                            addLinkBlock();
                          }}
                        >
                          URL
                        </MenuItem>
                        <MenuItem dense onClick={() => {}}>
                          Form
                        </MenuItem>
                      </SimpleMenu>
                    </Grid>
                  </BlockTypes>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>
                    Upload an image from your computer (minimum size 900X562.5
                    px)
                  </Typography>
                  <ItemImage>
                    <Dropzone
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      maxFiles={1}
                      onDrop={acceptedFiles =>
                        handleOnDrop(page.id, acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <BlockButton
                          style={
                            !headingBlock.imageHeader
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!headingBlock.imageHeader && (
                            <>
                              <Image fontSize="large" />
                              <Typography>Item Image</Typography>
                            </>
                          )}
                          {headingBlock.imageHeader && (
                            <img
                              src={itemImage.imageHeader}
                              alt={headingBlock.title}
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </ItemImage>
                  {headingBlock.imageHeader && (
                    <Grid
                      container
                      spacing={1}
                      direction="column"
                      alignContent="center"
                    >
                      <Grid item xs={10}>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={removeHeaderImage}
                        >
                          Delete
                        </Button>
                      </Grid>
                      <Grid item xs={10}>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => {
                            setImageCropOpen(true);
                          }}
                        >
                          Recrop Header Image
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {imageCropOpen && (
        <ImageCrop
          image={
            (uploadedFiles[page.id] &&
              !_.isEmpty(uploadedFiles[page.id]) &&
              _.head(uploadedFiles[page.id])) ||
            itemImage
          }
          handleClose={() => setImageCropOpen(false)}
          handleImageCrop={handleImageCrop}
          imageMap={imageDimensions}
        />
      )}
    </>
  );
}

Paragraph.propTypes = {
  open: PropTypes.bool,
  grandArticlePage: PropTypes.object,
  setGrandArticlePage: PropTypes.func,
  handleClose: PropTypes.func,
  dispatchUploadFile: PropTypes.func,
  uploadedFiles: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  uploadedFiles: makeSelectUploadFile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFile(field, options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Paragraph);
