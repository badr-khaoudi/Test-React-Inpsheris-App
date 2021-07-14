/**
 *
 * Widgets
 *
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardHeader, CardContent, Collapse, Avatar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { ExpandMore, ExpandLess, Edit, Event } from '@material-ui/icons';
import { makeSelectWidget } from 'containers/GlobalEntities/selectors';
import { WidgetIcons } from 'components/Icons';
import { editWidget } from 'containers/AuthBase/actions';
import { openCreateEvent } from 'containers/WidgetContainer/actions';
import { EditButton, WidgetCard, WidgetContent } from './Wrapper';
import CheckType from './CheckType';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function Widgets(props) {
  const { uid, canEdit, comunityId, userUid } = props;
  const widget = useSelector(makeSelectWidget(uid));
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const widgetContentRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);
  useEffect(() => {
    if (widgetContentRef.current) {
      setHasScroll(
        widgetContentRef.current.scrollHeight >
          widgetContentRef.current.clientHeight,
      );
    }
  }, [widgetContentRef]);
  return (
    <WidgetCard>
      <CardHeader
        avatar={
          <Avatar>
            <WidgetIcons type={widget.type} />
          </Avatar>
        }
        action={
          <>
            {canEdit && widget.type !== 'Admin' && (
              <EditButton onClick={() => dispatch(editWidget(comunityId, uid))}>
                <Edit fontSize="small" />
              </EditButton>
            )}
            {widget.type === 'RegularCalendar' && widget.defaultWidget && (
              <IconButton onClick={() => dispatch(openCreateEvent(uid))}>
                <Event fontSize="small" />
              </IconButton>
            )}
            <IconButton onClick={() => setExpanded(!expanded)}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </>
        }
        title={
          widget.type === 'Admin' ? (
            widget.title
          ) : (
            <Link to={`/widget/${uid}`} style={{ color: 'inherit' }}>
              {widget.title}
            </Link>
          )
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <WidgetContent
            ref={widgetContentRef}
            style={hasScroll ? { paddingRight: 8 } : null}
            className="WidgetContent"
          >
            {CheckType(widget, comunityId, userUid)}
          </WidgetContent>
        </CardContent>
      </Collapse>
    </WidgetCard>
  );
}

Widgets.propTypes = {
  uid: PropTypes.string,
  canEdit: PropTypes.bool,
  comunityId: PropTypes.string,
  userUid: PropTypes.string,
};

export default memo(Widgets);
