/**
 *
 * SortContent
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Feed from 'containers/FeedV8';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const SortableListItem = SortableElement(({ contentUid }) => (
  <Feed contentUid={contentUid} referrer="ChooseContent" overflow />
));

const SortableList = SortableContainer(({ contentUids }) => (
  <div>
    {_.map(contentUids, (contentUid, index) => (
      <SortableListItem
        key={contentUid}
        index={index}
        contentUid={contentUid}
      />
    ))}
  </div>
));

function SortContent(props) {
  const { contentUids, setContentUids, handleClose } = props;
  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
    >
      <DialogTitle>
        Sort Content
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <SortableList
          contentUids={contentUids}
          axis="xy"
          onSortEnd={({ oldIndex, newIndex }) =>
            setContentUids(arrayMove(contentUids, oldIndex, newIndex))
          }
          lockToContainerEdges
          helperClass="sortableHelper"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SortContent.propTypes = {
  contentUids: PropTypes.array,
  setContentUids: PropTypes.func,
  handleClose: PropTypes.func,
};

export default memo(SortContent);
