/* eslint-disable indent */
/**
 *
 * ChooseContent
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ListSubheader,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCommunityList } from 'containers/AuthBase/selectors';
import { CommunitySelect } from 'containers/QuickPost/Wrapper';
import Feed from 'containers/FeedV8';
import { periodOptions } from 'utils/constants/periodOptions';
import { makeSelectContentFilter } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  contentFilter as contentFilterAction,
  contentFilterMore,
} from './actions';
// import messages from './messages';

const contentTypes = [
  'allTypes',
  'article',
  'document',
  'quickpost',
  'event',
  'imageGallery',
  'grandArticle',
  'quickSharingOfTheLink',
];

export function ChooseContent(props) {
  useInjectReducer({ key: 'chooseContent', reducer });
  useInjectSaga({ key: 'chooseContent', saga });

  const {
    open,
    handleClose,
    dispatchContentFilter,
    contentFilter,
    dispatchContentFilterMore,
    contentUids,
    setContentUids,
    communityUids,
    tabUids,
    communityList,
    communityTabs,
    handleTabSelect,
    handleCommunitySelectOpen,
    sincebegining,
  } = props;

  const [type, setType] = useState('allTypes');
  const [searchText, setSearchText] = useState('');
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [contents, setContents] = useState(contentUids);

  useEffect(() => {
    if (sincebegining) {
      setPeriod('sincebegining');
    }
  }, []);

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      if (page > 1) {
        setPage(1);
      }
      if (!_.isEmpty(tabUids)) {
        dispatchContentFilter({
          communityUids,
          tabUids,
          type: type !== 'allTypes' ? type : undefined,
          searchText: searchText || undefined,
          period,
          startDate:
            period === 'choosedate'
              ? moment(startDate).format('DD/MM/YYYY')
              : undefined,
          endDate:
            period === 'choosedate'
              ? moment(endDate).format('DD/MM/YYYY')
              : undefined,
          page: 1,
          language: 'en',
        });
      }
    }
  }, [tabUids, type, searchText, period]);

  useEffect(() => {
    if (startDate && endDate) {
      if (page > 1) {
        setPage(1);
      }
      dispatchContentFilter({
        communityUids,
        tabUids,
        type: type !== 'allTypes' ? type : undefined,
        searchText: searchText || undefined,
        period,
        startDate:
          period === 'choosedate'
            ? moment(startDate).format('DD/MM/YYYY')
            : undefined,
        endDate:
          period === 'choosedate'
            ? moment(endDate).format('DD/MM/YYYY')
            : undefined,
        page: 1,
        language: 'en',
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (page > 1) {
      dispatchContentFilterMore({
        communityUids,
        tabUids,
        type: type !== 'allTypes' ? type : undefined,
        searchText: searchText || undefined,
        period,
        startDate:
          period === 'choosedate'
            ? moment(startDate).format('DD/MM/YYYY')
            : undefined,
        endDate:
          period === 'choosedate'
            ? moment(endDate).format('DD/MM/YYYY')
            : undefined,
        page,
        language: 'en',
      });
    }
  }, [page]);

  const handleContentUids = uid => {
    if (_.indexOf(contents, uid) > -1) {
      setContents(_.without(contents, uid));
    } else {
      setContents([...contents, uid]);
    }
  };

  const handleOk = () => {
    setContentUids(contents);
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="lg"
        disableEnforceFocus
      >
        <DialogTitle>
          Choose Content
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
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} onClick={handleCommunitySelectOpen}>
                  <CommunitySelect>
                    <Typography noWrap>
                      {_.size(communityUids) === 0
                        ? 'Community name/Category name'
                        : _.map(
                            _.filter(communityList, community =>
                              _.includes(communityUids, community.uid),
                            ),
                            community => community.label,
                          ).join(', ')}
                    </Typography>
                  </CommunitySelect>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Select community tab"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    disabled={_.isEmpty(communityUids)}
                    SelectProps={{
                      multiple: true,
                      value: tabUids,
                      renderValue: selected =>
                        _.map(selected, value =>
                          _.find(communityTabs, { uid: value })
                            ? _.find(communityTabs, { uid: value }).tabName
                            : undefined,
                        ).join(', '),
                      onChange: handleTabSelect,
                    }}
                  >
                    {_.map(
                      _.filter(
                        communityList,
                        community =>
                          _.indexOf(communityUids, community.uid) > -1,
                      ),
                      community => [
                        <ListSubheader>{community.label}</ListSubheader>,
                        _.map(community.tabs, tab => (
                          <MenuItem key={tab.uid} value={tab.uid} dense>
                            <Checkbox
                              checked={_.indexOf(tabUids, tab.uid) > -1}
                              color="primary"
                            />
                            <ListItemText primary={tab.tabName} />
                          </MenuItem>
                        )),
                      ],
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                    label="Content Type"
                    value={type}
                    onChange={e => {
                      setType(e.target.value);
                    }}
                  >
                    {_.map(contentTypes, contentType => (
                      <MenuItem key={contentType} value={contentType}>
                        {contentType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="Search"
                    value={searchText}
                    onChange={e => {
                      setSearchText(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                    label="Content Period"
                    value={period}
                    onChange={e => {
                      setPeriod(e.target.value);
                    }}
                  >
                    {_.map(periodOptions, periodOption => (
                      <MenuItem key={periodOption} value={periodOption}>
                        {periodOption}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {period === 'choosedate' && (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          inputVariant="outlined"
                          format="MMM dd, yyyy"
                          value={startDate}
                          onChange={setStartDate}
                          autoOk
                          fullWidth
                          maxDate={endDate}
                          TextFieldComponent={textFieldProps => (
                            <TextField
                              {...textFieldProps}
                              size="small"
                              variant="outlined"
                              InputProps={{
                                ...textFieldProps.InputProps,
                                style: { paddingRight: 0 },
                              }}
                              label="Start Date"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          inputVariant="outlined"
                          format="MMM dd, yyyy"
                          value={endDate}
                          onChange={setEndDate}
                          autoOk
                          fullWidth
                          minDate={startDate}
                          TextFieldComponent={textFieldProps => (
                            <TextField
                              {...textFieldProps}
                              size="small"
                              variant="outlined"
                              InputProps={{
                                ...textFieldProps.InputProps,
                                style: { paddingRight: 0 },
                              }}
                              label="End Date"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <div
                style={{
                  flex: 1,
                  padding: '0 15px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                }}
              >
                {_.map(contentFilter.contents, content => (
                  <div
                    role="checkbox"
                    aria-checked={_.indexOf(contents, content) > -1}
                    onClick={() => handleContentUids(content)}
                    onKeyPress={() => handleContentUids(content)}
                    tabIndex="0"
                    style={{ outlineStyle: 'none' }}
                  >
                    <Checkbox
                      color="primary"
                      checked={_.indexOf(contents, content) > -1}
                      onChange={() => handleContentUids(content)}
                      value={content}
                    />
                    <Feed
                      contentUid={content}
                      referrer="ChooseContent"
                      overflow
                    />
                  </div>
                ))}
                {page * 10 === _.size(contentFilter.contents) && (
                  <Button
                    onClick={() => setPage(page + 1)}
                    variant="outlined"
                    color="primary"
                  >
                    View More
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleOk}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ChooseContent.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  communityList: PropTypes.array,
  dispatchContentFilter: PropTypes.func,
  contentFilter: PropTypes.object,
  dispatchContentFilterMore: PropTypes.func,
  contentUids: PropTypes.array,
  setContentUids: PropTypes.func,
  communityUids: PropTypes.array,
  tabUids: PropTypes.array,
  communityTabs: PropTypes.array,
  handleTabSelect: PropTypes.func,
  handleCommunitySelectOpen: PropTypes.func,
  sincebegining: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  contentFilter: makeSelectContentFilter(),
  communityList: makeSelectCommunityList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchContentFilter: options => dispatch(contentFilterAction(options)),
    dispatchContentFilterMore: options => dispatch(contentFilterMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChooseContent);
