/**
 *
 * SortableBlockList
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import ArticleBlock from 'components/ArticleBlock';
import VideoBlock from 'containers/VideoBlock/Loadable';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import LinkBlock from 'components/LinkBlock/Loadable';
import EventBlock from 'components/EventBlock/Loadable';

const SortableArticleItem = SortableElement(
  ({ value, handleRemove, onChangeCKEditor }) => (
    <Grid item xs={12}>
      <Paper
        elevation={0}
        style={{
          backgroundColor: '#eceeef',
          padding: 10,
          position: 'relative',
        }}
      >
        <Grid container justify="flex-end">
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={() => handleRemove(value.uid)}
            >
              <Close fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <ArticleBlock
          data={value.content}
          onChangeCKEditor={data => onChangeCKEditor(value.uid, data)}
        />
      </Paper>
    </Grid>
  ),
);

const SortableVideoBlock = SortableElement(
  ({ value, handleRemove, handleBlockChange }) => (
    <Grid item xs={12}>
      <VideoBlock
        videos={value.videos}
        setVideos={videos => handleBlockChange(value.uid, 'videos', videos)}
        handleClose={() => handleRemove(value.uid)}
      />
    </Grid>
  ),
);

const SortableImageBlock = SortableElement(
  ({ value, handleRemove, handleBlockChange }) => (
    <Grid item xs={12}>
      <DocumentBlock
        type="Images"
        id={value.uid}
        items={value.images}
        setItems={images => handleBlockChange(value.uid, 'images', images)}
        handleClose={() => handleRemove(value.uid)}
      />
    </Grid>
  ),
);

const SortableDocumentBlock = SortableElement(
  ({ value, handleRemove, handleBlockChange }) => (
    <Grid item xs={12}>
      <DocumentBlock
        type="Documents"
        id={value.uid}
        items={value.documents}
        setItems={documents =>
          handleBlockChange(value.uid, 'documents', documents)
        }
        handleClose={() => handleRemove(value.uid)}
      />
    </Grid>
  ),
);

const SortableLinkBlock = SortableElement(
  ({ value, handleRemove, handleBlockChange }) => (
    <Grid item xs={12}>
      <LinkBlock
        links={value.links}
        setLinks={links => handleBlockChange(value.uid, 'links', links)}
        handleClose={() => handleRemove(value.uid)}
      />
    </Grid>
  ),
);

const SortableEventBlock = SortableElement(
  ({ value, handleRemove, handleBlockChange }) => (
    <Grid item xs={12}>
      <EventBlock
        event={value}
        setEvent={(name, val) => handleBlockChange(value.uid, name, val)}
        handleClose={() => handleRemove(value.uid)}
      />
    </Grid>
  ),
);

const CheckBlockType = (
  item,
  index,
  handleRemove,
  onChangeCKEditor,
  handleBlockChange,
) => {
  if (item.type === 'richText') {
    return (
      <SortableArticleItem
        key={index}
        index={index}
        value={item}
        onChangeCKEditor={onChangeCKEditor}
        handleRemove={handleRemove}
      />
    );
  }
  if (item.type === 'videoGallery') {
    return (
      <SortableVideoBlock
        key={item.uid}
        index={index}
        value={item}
        handleBlockChange={handleBlockChange}
        handleRemove={handleRemove}
      />
    );
  }
  if (item.type === 'ImageGallery') {
    return (
      <SortableImageBlock
        key={item.uid}
        index={index}
        value={item}
        handleBlockChange={handleBlockChange}
        handleRemove={handleRemove}
      />
    );
  }
  if (item.type === 'documentGallery') {
    return (
      <SortableDocumentBlock
        key={item.uid}
        index={index}
        value={item}
        handleBlockChange={handleBlockChange}
        handleRemove={handleRemove}
      />
    );
  }
  if (item.type === 'linkEmbed') {
    return (
      <SortableLinkBlock
        key={item.uid}
        index={index}
        value={item}
        handleBlockChange={handleBlockChange}
        handleRemove={handleRemove}
      />
    );
  }
  if (item.type === 'event') {
    return (
      <SortableEventBlock
        key={item.uid}
        index={index}
        value={item}
        handleBlockChange={handleBlockChange}
        handleRemove={handleRemove}
      />
    );
  }
  return null;
};

const SortableBlockList = SortableContainer(
  ({ items, handleRemove, onChangeCKEditor, handleBlockChange }) => (
    <Grid container spacing={2}>
      {_.map(items, (item, index) =>
        CheckBlockType(
          item,
          index,
          handleRemove,
          onChangeCKEditor,
          handleBlockChange,
        ),
      )}
    </Grid>
  ),
);

export default SortableBlockList;
