/**
 *
 * WidgetContainer
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import LazyLoad from 'react-lazyload';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { setWidgetListOrder } from 'containers/HomePage/actions';
import { widgetListOrder } from 'containers/CommunityTab/actions';
import Widgets from 'components/Widgets';
import loadable from 'utils/loadable';
import saga from './saga';
import reducer from './reducer';
import { setWidgetOrder } from './actions';
import { makeSelectOpenCreateEvent } from './selectors';

const CreateEvent = loadable(() => import('components/Widgets/CreateEvent'));

const SortableItem = SortableElement(({ uid, canEdit, comunityId }) => (
  <Grid item xs={12}>
    <LazyLoad
      offset={200}
      placeholder={<Skeleton variant="rect" style={{ height: 350 }} />}
      debounce
      once
    >
      <Widgets uid={uid} canEdit={canEdit} comunityId={comunityId} />
    </LazyLoad>
  </Grid>
));

const SortableList = SortableContainer(({ items, canEdit, comunityId }) => (
  <Grid container spacing={2}>
    {_.map(items, (item, i) => (
      <SortableItem
        key={item}
        index={i}
        uid={item}
        disabled={!canEdit}
        canEdit={canEdit}
        comunityId={comunityId}
      />
    ))}
  </Grid>
));

export function WidgetContainer(props) {
  useInjectReducer({ key: 'widgetContainer', reducer });
  useInjectSaga({ key: 'widgetContainer', saga });

  const {
    currentUser,
    widgetList,
    dispatchSetWidgetOrder,
    dispatchSetWidgetListOrder,
    openCreateEvent,
    displayOption,
    dispatchWidgetListOrder,
    comunityId,
  } = props;

  const canEdit = useMemo(
    () =>
      !currentUser.readOnly && currentUser.role === 'GlobalCommunityManager',
    [currentUser],
  );

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const order = arrayMove(widgetList, oldIndex, newIndex);
    if (displayOption === 'Community') {
      dispatchWidgetListOrder(order);
    } else {
      dispatchSetWidgetListOrder(order);
    }
    const request = _.map(order, (widget, i) => ({
      uid: widget,
      sequenceNumber: i + 1,
    }));
    dispatchSetWidgetOrder(request);
  };

  return (
    <>
      <SortableList
        helperClass="sortableHelper"
        items={widgetList}
        lockAxis="y"
        pressDelay={200}
        onSortEnd={handleSortEnd}
        useWindowAsScrollContainer
        lockToContainerEdges
        canEdit={canEdit}
        shouldCancelStart={e =>
          _.includes(e.srcElement.classList, 'WidgetContent')
        }
        comunityId={comunityId}
      />
      {openCreateEvent && <CreateEvent />}
    </>
  );
}

WidgetContainer.propTypes = {
  currentUser: PropTypes.object,
  widgetList: PropTypes.array.isRequired,
  dispatchSetWidgetOrder: PropTypes.func,
  dispatchSetWidgetListOrder: PropTypes.func,
  openCreateEvent: PropTypes.bool,
  displayOption: PropTypes.string,
  dispatchWidgetListOrder: PropTypes.func,
  comunityId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  openCreateEvent: makeSelectOpenCreateEvent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSetWidgetOrder: data => dispatch(setWidgetOrder(data)),
    dispatchSetWidgetListOrder: data => dispatch(setWidgetListOrder(data)),
    dispatchWidgetListOrder: data => dispatch(widgetListOrder(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WidgetContainer);
