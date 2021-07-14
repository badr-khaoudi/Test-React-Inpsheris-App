/**
 *
 * MoveDocument
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { ArrowBack } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DocumentTree from 'components/DocumentTree';
import { makeSelectDocumentTreeList } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  getCommunityTab,
  documentTreeList as documentTreeListAction,
} from './actions';

export function MoveDocument(props) {
  useInjectReducer({ key: 'moveDocument', reducer });
  useInjectSaga({ key: 'moveDocument', saga });

  const {
    open,
    handleMoveClose,
    handleDocumentMove,
    backId: tabBackId,
    dispatchCommunityTab,
    dispatchDocumentTreeList,
    documentTreeList,
    communityUid,
    tabType,
    tabUid,
    track,
    documentId,
  } = props;

  const getDocumentTreeList = parentId => {
    if (parentId) {
      dispatchDocumentTreeList({
        communityUid,
        parentId,
        sortField: 'sequenceNumber',
        sortKey: 'asc',
        tabUid,
      });
    } else {
      dispatchCommunityTab({
        communityUid,
        sortField: 'sequenceNumber',
        sortKey: 'asc',
        tabType,
        tabUid,
        track,
      });
    }
  };

  const [backId, setBackId] = useState([...tabBackId]);
  const [currentId, setCurrentId] = useState(documentId.parentId);

  useEffect(() => {
    getDocumentTreeList(documentId.parentId);
  }, [documentId]);

  const handleFolderClick = document => {
    setBackId([...backId, document]);
    setCurrentId(document);
    getDocumentTreeList(document.id);
  };

  const handleMove = () => {
    handleDocumentMove(
      backId,
      currentId,
      _.map([...documentTreeList, documentId], (document, index) => ({
        id: document.id,
        sequenceNumber: index,
      })),
    );
  };

  return (
    <Dialog open={open} onClose={handleMoveClose} fullWidth maxWidth="sm">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          disabled={_.size(backId) === 0}
          onClick={() => {
            const { parentId } = backId.pop();
            getDocumentTreeList(parentId);
            setCurrentId(parentId);
          }}
        >
          <ArrowBack />
        </IconButton>
      </Toolbar>
      <DialogContent style={{ maxHeight: 435 }}>
        <DocumentTree
          documents={documentTreeList}
          handleFolderClick={handleFolderClick}
          disabledItem={documentId.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleMove}
          color="primary"
          disabled={
            typeof currentId === 'object'
              ? currentId.id === documentId.parentId
              : currentId === documentId.parentId
          }
        >
          Move
        </Button>
        <Button onClick={handleMoveClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MoveDocument.propTypes = {
  open: PropTypes.bool,
  handleMoveClose: PropTypes.func,
  handleDocumentMove: PropTypes.func,
  backId: PropTypes.array,
  dispatchCommunityTab: PropTypes.func,
  dispatchDocumentTreeList: PropTypes.func,
  documentTreeList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  communityUid: PropTypes.string,
  tabType: PropTypes.string,
  tabUid: PropTypes.string,
  track: PropTypes.string,
  documentId: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  documentTreeList: makeSelectDocumentTreeList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityTab: options => dispatch(getCommunityTab(options)),
    dispatchDocumentTreeList: options =>
      dispatch(documentTreeListAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoveDocument);
