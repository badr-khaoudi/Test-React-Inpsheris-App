/**
 *
 * DefaultRegularCalendar
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import _ from 'lodash';
import { DateTime, Interval } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { calendar } from 'containers/GlobalEntities/actions';
import { calendarOptions } from 'containers/WidgetContainer/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Event from './Event';
import './fullcalendar.scss';
import { DayCell } from './Wrapper';

// eslint-disable-next-line consistent-return
const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

function DefaultRegularCalendar({ widget, comunityId, userUid }) {
  const dispatch = useDispatch();
  const locale = useSelector(makeSelectLocale());
  const startRef = useRef();
  const endRef = useRef();
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [days, setDays] = useState({});

  const handleDatesSet = ({ startStr, endStr }) => {
    setDays({});
    startRef.current = DateTime.fromISO(startStr);
    endRef.current = DateTime.fromISO(endStr);
    const options = {
      start: startRef.current.toFormat('yyyy-MM-dd'),
      end: endRef.current.toFormat('yyyy-MM-dd'),
      comunityId,
      userUid,
    };
    dispatch(calendarOptions(options));
    dispatch(calendar(widget.uid, options));
  };

  useEffect(() => {
    if (_.isEmpty(widget.calendar)) {
      return;
    }
    let dates = {};
    const events = [];
    _.forEach(widget.calendar, ({ start, end, uid }) => {
      const startDate = DateTime.fromISO(start);
      const endDate = DateTime.fromISO(end)
        .plus({ days: 1 })
        .startOf('day');
      const trueStart =
        startDate < startRef.current ? startRef.current.day : startDate.day;
      const trueEnd =
        endDate > endRef.current.plus({ days: -1 })
          ? endRef.current.plus({ days: -1 }).day + 1
          : endDate.day;
      dates = _.mergeWith(
        dates,
        _.reduce(
          _.range(trueStart, trueEnd),
          (obj, day) => ({
            ...obj,
            [day]: [uid],
          }),
          {},
        ),
        customizer,
      );
      events.push({
        start: startDate.toISODate(),
        end: endDate.toISODate(),
        allDay: true,
        display: 'background',
        backgroundColor: `${endDate < DateTime.now() ? '#eeeeee' : '#e0e0e0'}`,
      });
    });
    setCalendarEvents(events);
    setDays(dates);
  }, [widget.calendar]);

  const [selectedDate, setSelectedDate] = useState();
  const handleDateClick = ({ dateStr }) => setSelectedDate(dateStr);

  return (
    <>
      <FullCalendar
        locale={locale}
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next',
        }}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        selectable
        dayMaxEvents
        // contentHeight="auto"
        events={calendarEvents}
        datesSet={handleDatesSet}
        showNonCurrentDates={false}
        fixedWeekCount={false}
        dayCellContent={arg => (
          <DayCell
            $isMultiple={_.size(days[arg.dayNumberText]) > 1}
            $isToday={arg.isToday}
          >
            {arg.dayNumberText}
          </DayCell>
        )}
      />
      {selectedDate && (
        <Grid container spacing={2}>
          {_.map(
            _.filter(widget.calendar, cal =>
              Interval.fromDateTimes(
                DateTime.fromISO(cal.start).startOf('day'),
                DateTime.fromISO(cal.end)
                  .plus({ days: 1 })
                  .startOf('day'),
              ).contains(DateTime.fromISO(selectedDate)),
            ),
            event => (
              <Grid item xs={12} key={event.uid}>
                <Event event={event} widgetUid={widget.uid} type="default" />
              </Grid>
            ),
          )}
        </Grid>
      )}
    </>
  );
}

DefaultRegularCalendar.propTypes = {
  widget: PropTypes.object,
  comunityId: PropTypes.string,
  userUid: PropTypes.string,
};

export default memo(DefaultRegularCalendar);
