/* eslint-disable indent */
/**
 *
 * AddDescription
 *
 */

import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import arrayMove from 'array-move';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Divider,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  Close,
  Description,
  Image,
  Videocam,
  Folder,
  InsertLink,
} from '@material-ui/icons';
import {
  BlockTypes,
  BlockItem,
  BlockButton,
} from 'containers/ContentCreation/Wrapper';
import SortableBlockList from 'components/SortableBlockList/Loadable';
import { AddDescriptionSchema } from './Schema';

function AddDescription({
  descriptionBlocks,
  handleDescriptionBlocks,
  handleClose,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [blocks, setBlocks] = useState(
    _.map(descriptionBlocks, descriptionBlock =>
      descriptionBlock.type === 'linkEmbed'
        ? {
            ...descriptionBlock,
            uid: descriptionBlock.uid || uuidv4(),
            links: _.map(descriptionBlock.links, link => ({
              id: uuidv4(),
              ...link,
            })),
          }
        : {
            ...descriptionBlock,
            uid: descriptionBlock.uid || uuidv4(),
          },
    ) || [],
  );

  const addArticleBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), content: '', type: 'richText' }]);
  };

  const addImageBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), images: [], type: 'ImageGallery' }]);
  };

  const addVideoBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), videos: [], type: 'videoGallery' }]);
  };

  const addURLBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), links: [], type: 'linkEmbed' }]);
  };

  const addDocumentBlock = () => {
    setBlocks([
      ...blocks,
      { uid: uuidv4(), documents: [], type: 'documentGallery' },
    ]);
  };

  const handleRemove = useCallback(uid => {
    setBlocks(_blocks => _.filter(_blocks, block => block.uid !== uid));
  }, []);

  const onChangeCKEditor = useCallback((uid, data) => {
    setBlocks(_blocks =>
      _.map(_blocks, block =>
        block.uid && block.uid === uid
          ? { ...block, content: data, modifiedBlock: true }
          : block,
      ),
    );
  }, []);

  const handleBlockChange = useCallback((uid, type, items) => {
    setBlocks(_blocks =>
      _.map(_blocks, block =>
        block.uid === uid ? { ...block, [type]: items } : block,
      ),
    );
  }, []);

  const handleSave = () => {
    const result = AddDescriptionSchema.validate(blocks);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      handleDescriptionBlocks(blocks);
      handleClose();
    }
  };

  return (
    <Dialog open scroll="paper" fullWidth maxWidth="md" disableEnforceFocus>
      <DialogTitle>
        Add Description
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justify="center">
          <Grid item xs={8}>
            <BlockTypes elevation={0}>
              <Grid container>
                <Grid item xs>
                  <BlockItem>
                    <BlockButton onClick={addArticleBlock}>
                      <Description />
                      Article
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
                    <BlockButton onClick={addURLBlock}>
                      <InsertLink />
                      URL
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
              </Grid>
            </BlockTypes>
          </Grid>
          <Grid item xs={12} style={{ zIndex: 1301 }}>
            <SortableBlockList
              items={blocks}
              axis="xy"
              onSortEnd={({ oldIndex, newIndex }) =>
                setBlocks(arrayMove(blocks, oldIndex, newIndex))
              }
              lockToContainerEdges
              helperClass="sortableHelper"
              pressDelay={200}
              shouldCancelStart={e =>
                _.includes(e.srcElement.classList, 'MuiSelect-root') ||
                _.includes(e.srcElement.classList, 'MuiSvgIcon-root') ||
                _.includes(e.srcElement.classList, 'MuiButtonBase-root') ||
                _.includes(e.srcElement.classList, 'cke_resizer')
              }
              onChangeCKEditor={onChangeCKEditor}
              handleBlockChange={handleBlockChange}
              handleRemove={handleRemove}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} variant="outlined" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddDescription.propTypes = {
  descriptionBlocks: PropTypes.array,
  handleDescriptionBlocks: PropTypes.func,
  handleClose: PropTypes.func,
};

export default memo(AddDescription);
