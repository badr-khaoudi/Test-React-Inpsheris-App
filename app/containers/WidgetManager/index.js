/* eslint-disable indent */
/**
 *
 * WidgetManager
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Avatar,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  Close,
  Edit,
  Delete,
  DragHandle as DragHandleIcon,
} from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { useConfirm } from 'material-ui-confirm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { WidgetIcons } from 'components/Icons';
import {
  closeWidgetManager,
  createWidget,
  editWidget,
} from 'containers/AuthBase/actions';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { setWidgetListOrder } from 'containers/HomePage/actions';
import { widgetListOrder } from 'containers/CommunityTab/actions';
import { makeSelectWidget } from 'containers/GlobalEntities/selectors';
import { makeSelectWidgets, makeSelectWidgetLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { widget as widgetAction, deleteWidget, widgetOrder } from './actions';

const DragHandle = SortableHandle(() => (
  <IconButton>
    <DragHandleIcon fontSize="small" />
  </IconButton>
));

const SortableListItem = SortableElement(
  ({ uid, communityUid, handleDelete }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(makeSelectCurrentUser());
    const widget = useSelector(makeSelectWidget(uid));

    return (
      <Grid
        item
        xs={12}
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar>
              <WidgetIcons type={widget.type} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{widget.title}</Typography>
          </Grid>
          <Grid item>
            <DragHandle />
            {!currentUser.readOnly &&
              currentUser.role === 'GlobalCommunityManager' && (
                <>
                  <IconButton
                    onClick={() =>
                      dispatch(editWidget(communityUid, widget.uid))
                    }
                    edge={widget.defaultWidget && 'end'}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  {!widget.defaultWidget && (
                    <IconButton
                      edge="end"
                      onClick={() => handleDelete(widget.uid)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </>
              )}
          </Grid>
        </Grid>
      </Grid>
    );
  },
);

const SortableList = SortableContainer(
  ({ widgets, communityUid, handleDelete }) => (
    <Grid container spacing={2}>
      {_.map(
        widgets,
        (widget, index) =>
          widget && (
            <SortableListItem
              key={widget}
              index={index}
              uid={widget}
              communityUid={communityUid}
              handleDelete={handleDelete}
            />
          ),
      )}
    </Grid>
  ),
);

export function WidgetManager(props) {
  useInjectReducer({ key: 'widgetManager', reducer });
  useInjectSaga({ key: 'widgetManager', saga });
  const confirm = useConfirm();

  const {
    dispatchCloseWidgetManager,
    dispatchCreateWidget,
    dispatchWidget,
    widgets,
    dispatchDeleteWidget,
    widgetLoading,
    displayOption,
    communityUid,
    dispatchWidgetOrder,
    dispatchSetWidgetListOrder,
    dispatchWidgetListOrder,
  } = props;

  useEffect(() => {
    dispatchWidget({ displayOption, communityUid });
  }, []);

  const handleDelete = useCallback(async uid => {
    try {
      await confirm({
        description: 'Are you sure you want to delete this widget?',
      });
      dispatchDeleteWidget({ uid });
    } catch {
      return false;
    }
    return false;
  }, []);

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const order = arrayMove(widgets, oldIndex, newIndex);
    if (displayOption === 'Community') {
      dispatchWidgetListOrder(order);
    } else {
      dispatchSetWidgetListOrder(order);
    }
    const request = _.map(order, (widget, i) => ({
      uid: widget.uid,
      sequenceNumber: i + 1,
    }));
    dispatchWidgetOrder(order, request);
  };

  return (
    <div>
      <Helmet>
        <title>WidgetManager</title>
        <meta name="description" content="Description of WidgetManager" />
      </Helmet>
      <Dialog
        open
        onClose={dispatchCloseWidgetManager}
        scroll="paper"
        fullWidth
        maxWidth="sm"
        disableEnforceFocus
      >
        <DialogTitle>
          Widget Manager
          <IconButton
            aria-label="close"
            onClick={dispatchCloseWidgetManager}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => dispatchCreateWidget(communityUid)}
              >
                Create Widget
              </Button>
            </Grid>
            <Grid item xs={12}>
              {widgetLoading &&
                _.map(_.range(5), index => (
                  <Skeleton
                    key={index}
                    variant="rect"
                    height={48}
                    style={{ marginBottom: 5 }}
                  />
                ))}
              {!_.isEmpty(widgets) && (
                <SortableList
                  widgets={widgets}
                  axis="xy"
                  lockToContainerEdges
                  helperClass="sortableHelper"
                  handleDelete={handleDelete}
                  onSortEnd={handleSortEnd}
                  useDragHandle
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

WidgetManager.propTypes = {
  dispatchCloseWidgetManager: PropTypes.func,
  dispatchCreateWidget: PropTypes.func,
  dispatchWidget: PropTypes.func,
  widgets: PropTypes.array,
  dispatchDeleteWidget: PropTypes.func,
  widgetLoading: PropTypes.bool,
  displayOption: PropTypes.string,
  communityUid: PropTypes.string,
  dispatchWidgetOrder: PropTypes.func,
  dispatchSetWidgetListOrder: PropTypes.func,
  dispatchWidgetListOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  widgets: makeSelectWidgets(),
  widgetLoading: makeSelectWidgetLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseWidgetManager: () => dispatch(closeWidgetManager()),
    dispatchCreateWidget: communityUid => dispatch(createWidget(communityUid)),
    dispatchEditWidget: (communityUid, options) =>
      dispatch(editWidget(communityUid, options)),
    dispatchWidget: options => dispatch(widgetAction(options)),
    dispatchDeleteWidget: options => dispatch(deleteWidget(options)),
    dispatchWidgetOrder: (order, request) =>
      dispatch(widgetOrder(order, request)),
    dispatchSetWidgetListOrder: options =>
      dispatch(setWidgetListOrder(options)),
    dispatchWidgetListOrder: options => dispatch(widgetListOrder(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WidgetManager);
