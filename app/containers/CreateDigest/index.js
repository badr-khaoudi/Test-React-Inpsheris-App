/* eslint-disable indent */
/**
 *
 * CreateDigest
 *
 */

import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
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
  FormControlLabel,
  ListSubheader,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import { CommunitySelect } from 'containers/QuickPost/Wrapper';
import SelectCommunity from 'components/SelectCommunity/Loadable';
import ChooseContent from 'containers/ChooseContent/Loadable';
import SortContent from 'components/SortContent/Loadable';
import {
  getCommunityList,
  filterCommunityList,
  closeCreateDigest,
} from 'containers/AuthBase/actions';
import {
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
} from 'containers/AuthBase/selectors';
import { Template1, Template4 } from 'components/DigestTemplates';
import { makeSelectDigestById } from 'containers/Digest/selectors';
import {
  makeSelectTemplates,
  makeSelectTypes,
  makeSelectRepeat,
  makeSelectContentTypes,
  makeSelectCreateDigestSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  templates as templatesAction,
  types as typesAction,
  repeat as repeatAction,
  contentTypes as contentTypesAction,
  createDigest,
  digestContent as digestContentAction,
  cleanCreateDigest,
} from './actions';
import { CreateDigestSchema } from './Schema';
// import messages from './messages';

export function CreateDigest(props) {
  useInjectReducer({ key: 'createDigest', reducer });
  useInjectSaga({ key: 'createDigest', saga });

  const {
    editDigestId,
    dispatchTemplates,
    dispatchTypes,
    dispatchRepeat,
    dispatchContentTypes,
    templates,
    types,
    repeat,
    contentTypes,
    dispatchCommunityList,
    dispatchFilterCommunityList,
    communityList: allCommunities,
    communityListLoading,
    dispatchCreateDigest,
    dispatchCloseCreateDigest,
    dispatchDigestContent,
    digestContent,
    createDigestSuccess,
    dispatchCleanCreateDigest,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [digestType, setDigestType] = useState('');
  const [digestDesign, setDigestDesign] = useState('');
  const [automatedDigestDetails, setAutomatedDigestDetails] = useState({
    digestContentType: '',
    repeatDigest: '',
    days: 1,
    startDate: null,
    endDate: null,
  });
  const [isSchedule, setIsSchedule] = useState(false);
  const [sendDate, setSendDate] = useState(null);
  const [communityList, setCommunityList] = useState([]);
  const [communitySelectOpen, setCommunitySelectOpen] = useState(false);
  const [communityUids, setCommunityUids] = useState([]);
  const [tabUids, setTabUids] = useState([]);
  const [chooseContentOpen, setChooseContentOpen] = useState(false);
  const [contentUids, setContentUids] = useState([]);
  const [sortContentOpen, setSortContentOpen] = useState(false);

  useEffect(() => {
    if (automatedDigestDetails > 1) {
      setAutomatedDigestDetails({ ...automatedDigestDetails, days: 1 });
    }
  }, [automatedDigestDetails.repeatDigest]);

  useEffect(() => {
    if (editDigestId) {
      dispatchDigestContent({ id: editDigestId });
    }
    if (digestContent !== undefined) {
      dispatchCommunityList({ filter: 'lively', gplusCommunity: 'ALL' });
    }
  }, []);

  useEffect(() => {
    if (
      !_.isEmpty(communityList) &&
      !_.isEmpty(templates) &&
      !_.isEmpty(types) &&
      digestContent
    ) {
      setTitle(digestContent.title);
      setEmailSubject(digestContent.emailSubject || '');
      setDigestType(digestContent.digestType);
      setDigestDesign(digestContent.digestDesign);
      setIsSchedule(digestContent.isSchedule || false);
      setSendDate(digestContent.sendDate || null);
      setCommunityUids(digestContent.communities || []);
      setTabUids(digestContent.communityTabs || []);
      setContentUids(digestContent.contents || []);
    }
  }, [communityList, templates, types]);

  useEffect(() => {
    if (
      !_.isEmpty(repeat) &&
      !_.isEmpty(contentTypes) &&
      digestContent &&
      digestContent.digestType === 'Automatic'
    ) {
      setAutomatedDigestDetails({
        ...automatedDigestDetails,
        ...digestContent.details,
        days: digestContent.details.days
          ? _.parseInt(_.trim(_.head(digestContent.details.days), '"'))
          : 1,
      });
    }
  }, [repeat, contentTypes]);

  useEffect(() => {
    if (!digestContent && !_.isEmpty(templates)) {
      setDigestDesign(_.head(templates));
    }
  }, [templates]);

  useEffect(() => {
    if (!digestContent && !_.isEmpty(types)) {
      setDigestType(_.head(types));
    }
  }, [types]);

  useEffect(() => {
    if (!digestContent && !_.isEmpty(repeat)) {
      setAutomatedDigestDetails({
        ...automatedDigestDetails,
        repeatDigest: _.head(repeat),
      });
    }
  }, [repeat]);

  useEffect(() => {
    if (!digestContent && !_.isEmpty(contentTypes)) {
      setAutomatedDigestDetails({
        ...automatedDigestDetails,
        digestContentType: _.head(contentTypes),
      });
    }
  }, [contentTypes]);

  const handleAutomatedDigestDetails = (name, value) => {
    setAutomatedDigestDetails({
      ...automatedDigestDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatchTemplates();
    dispatchTypes();
    return () => dispatchCleanCreateDigest();
  }, []);

  useEffect(() => {
    if (digestType === 'Automatic') {
      dispatchRepeat();
      dispatchContentTypes();
    }
  }, [digestType]);

  useEffect(() => {
    setCommunityList(_.filter(allCommunities, { privated: 0 }));
  }, [allCommunities]);

  const communityTabs = useMemo(
    () =>
      _.flatten(
        _.map(communityList, community =>
          _.map(community.tabs, ({ uid, tabName }) => ({
            uid,
            tabName,
          })),
        ),
      ),
    [communityList],
  );

  const handleCommunitySelectOpen = useCallback(() => {
    if (_.isEmpty(communityList)) {
      dispatchCommunityList({ filter: 'lively', gplusCommunity: 'ALL' });
    }
    setCommunitySelectOpen(true);
  }, []);

  const handleCommunitySelectClose = useCallback(() => {
    setCommunitySelectOpen(false);
  }, []);

  const handleFilterCommunities = useCallback(searchText => {
    dispatchFilterCommunityList({
      filter: 'lively',
      gplusCommunity: 'ALL',
      searchText,
    });
  }, []);

  const handleTabSelect = e => {
    setTabUids(e.target.value);
  };

  const handleSelectCommunityChange = useCallback(() => {
    setTabUids(
      _.compact(
        _.flatten(
          _.map(
            _.filter(
              communityList,
              community => _.indexOf(communityUids, community.uid) > -1,
            ),
            community => _.map(community.tabs, ({ uid }) => uid),
          ),
        ),
      ),
    );
    handleCommunitySelectClose();
  }, [communityList, communityUids]);

  const handleSelectedCommunities = useCallback(
    e => {
      if (_.indexOf(communityUids, e.target.value) > -1) {
        setCommunityUids(_.without(communityUids, e.target.value));
      } else {
        setCommunityUids([...communityUids, e.target.value]);
      }
    },
    [communityUids],
  );

  const handleSave = status => {
    const payload = {
      id: editDigestId,
      active: true,
      automatedDigestDetails:
        digestType === 'Automatic'
          ? {
              ...automatedDigestDetails,
              days:
                automatedDigestDetails.repeatDigest === 'DayOfWeek' ||
                automatedDigestDetails.repeatDigest === 'DayOfMonth'
                  ? [`"${automatedDigestDetails.days}"`]
                  : undefined,
              startDate: automatedDigestDetails.startDate
                ? parseFloat(
                    moment(automatedDigestDetails.startDate).format('x'),
                  )
                : undefined,
              endDate: automatedDigestDetails.endDate
                ? parseFloat(moment(automatedDigestDetails.endDate).format('x'))
                : undefined,
            }
          : undefined,
      communityUids,
      contentUids: digestType === 'Custom' ? contentUids : undefined,
      digestDesign,
      digestType,
      emailSubject,
      isSchedule,
      sendDate:
        digestType === 'Custom'
          ? parseFloat(moment(sendDate).format('x'))
          : undefined,
      status,
      tabUids,
      title,
    };
    const result = CreateDigestSchema.validate(payload);
    if (result.error) {
      _.map(result.error.details, error =>
        enqueueSnackbar(error.message, {
          variant: 'error',
        }),
      );
    }
    if (!result.error) {
      dispatchCreateDigest(payload);
    }
  };

  useEffect(() => {
    if (createDigestSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCloseCreateDigest();
    }
  }, [createDigestSuccess]);

  useCloseEffect(dispatchCloseCreateDigest);

  return (
    <>
      <Dialog
        open
        onClose={dispatchCloseCreateDigest}
        scroll="body"
        fullWidth
        maxWidth="lg"
        disableEnforceFocus
      >
        <DialogTitle>
          Create Digest
          <IconButton
            aria-label="close"
            onClick={dispatchCloseCreateDigest}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="Digest Name"
                    value={title}
                    onChange={e => {
                      setTitle(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    label="Email Subject"
                    value={emailSubject}
                    onChange={e => {
                      setEmailSubject(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                    label="Template"
                    value={digestDesign}
                    onChange={e => {
                      setDigestDesign(e.target.value);
                    }}
                  >
                    {_.map(templates, template => (
                      <MenuItem key={template} value={template}>
                        {template}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    select
                    size="small"
                    label="Digest Type"
                    value={digestType}
                    onChange={e => {
                      setDigestType(e.target.value);
                    }}
                  >
                    {_.map(types, type => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {digestType === 'Automatic' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        size="small"
                        label="Repeat"
                        value={automatedDigestDetails.repeatDigest}
                        onChange={e =>
                          handleAutomatedDigestDetails(
                            'repeatDigest',
                            e.target.value,
                          )
                        }
                      >
                        {_.map(repeat, rep => (
                          <MenuItem key={rep} value={rep}>
                            {rep}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    {automatedDigestDetails.repeatDigest === 'DayOfWeek' && (
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          select
                          size="small"
                          label="Day"
                          value={automatedDigestDetails.days}
                          onChange={e =>
                            handleAutomatedDigestDetails('days', e.target.value)
                          }
                        >
                          {_.map(_.range(7), day => (
                            <MenuItem key={day} value={day + 1}>
                              {day + 1}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    )}
                    {automatedDigestDetails.repeatDigest === 'DayOfMonth' && (
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          select
                          size="small"
                          label="Day"
                          value={automatedDigestDetails.days}
                          onChange={e =>
                            handleAutomatedDigestDetails('days', e.target.value)
                          }
                        >
                          {_.map(_.range(31), day => (
                            <MenuItem key={day} value={day + 1}>
                              {day + 1}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        size="small"
                        label="Content Type"
                        value={automatedDigestDetails.digestContentType}
                        onChange={e =>
                          handleAutomatedDigestDetails(
                            'digestContentType',
                            e.target.value,
                          )
                        }
                      >
                        {_.map(contentTypes, contentType => (
                          <MenuItem key={contentType} value={contentType}>
                            {contentType}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MMM dd, yyyy"
                            value={automatedDigestDetails.startDate}
                            onChange={date =>
                              handleAutomatedDigestDetails('startDate', date)
                            }
                            autoOk
                            disablePast
                            fullWidth
                            maxDate={automatedDigestDetails.endDate}
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
                            value={automatedDigestDetails.endDate}
                            onChange={date =>
                              handleAutomatedDigestDetails('endDate', date)
                            }
                            autoOk
                            disablePast
                            fullWidth
                            minDate={automatedDigestDetails.startDate}
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
                  </>
                )}
                {digestType === 'Custom' && (
                  <>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        disableElevation
                        onClick={() => setChooseContentOpen(true)}
                      >
                        Choose Content
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSchedule}
                            onChange={e => setIsSchedule(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Schedule a plan"
                      />
                    </Grid>
                    {isSchedule && (
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              format="MMM dd, yyyy"
                              value={sendDate}
                              onChange={setSendDate}
                              autoOk
                              disablePast
                              fullWidth
                              TextFieldComponent={textFieldProps => (
                                <TextField
                                  {...textFieldProps}
                                  size="small"
                                  variant="outlined"
                                  InputProps={{
                                    ...textFieldProps.InputProps,
                                    style: { paddingRight: 0 },
                                  }}
                                  placeholder="Start Date"
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <KeyboardTimePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              value={sendDate}
                              onChange={setSendDate}
                              autoOk
                              fullWidth
                              TextFieldComponent={textFieldProps => (
                                <TextField
                                  {...textFieldProps}
                                  size="small"
                                  variant="outlined"
                                  InputProps={{
                                    ...textFieldProps.InputProps,
                                    style: { paddingRight: 0 },
                                  }}
                                  placeholder="Start Time"
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    {_.size(contentUids) > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="h6">{`${_.size(
                            contentUids,
                          )} contents selected`}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={() => setSortContentOpen(true)}
                          >
                            Sort Contents
                          </Button>
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={8} style={{ maxHeight: '80vh', overflow: 'auto' }}>
              {digestDesign === 'Template1' && <Template1 />}
              {digestDesign === 'Template4' && (
                <Template4
                  digest={{ emailSubject, title }}
                  contentUids={contentUids}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSave('Draft')}
          >
            Save as draft
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSave('Preview')}
          >
            Send preview
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleSave('Publish')}
          >
            Send now
          </Button>
        </DialogActions>
      </Dialog>
      {communitySelectOpen && (
        <SelectCommunity
          communitySelectOpen={communitySelectOpen}
          handleClose={handleCommunitySelectClose}
          communityListLoading={communityListLoading}
          communityList={communityList}
          selectedCommunities={communityUids}
          handleSelectedCommunities={handleSelectedCommunities}
          handleFilterCommunities={handleFilterCommunities}
          handleSelectCommunityChange={handleSelectCommunityChange}
        />
      )}
      {chooseContentOpen && (
        <ChooseContent
          open={chooseContentOpen}
          handleClose={() => setChooseContentOpen(false)}
          contentUids={contentUids}
          setContentUids={setContentUids}
          communityUids={communityUids}
          tabUids={tabUids}
          communityTabs={communityTabs}
          handleTabSelect={handleTabSelect}
          handleCommunitySelectOpen={handleCommunitySelectOpen}
          sincebegining={digestContent !== undefined}
        />
      )}
      {sortContentOpen && (
        <SortContent
          contentUids={contentUids}
          setContentUids={setContentUids}
          handleClose={() => setSortContentOpen(false)}
        />
      )}
    </>
  );
}

CreateDigest.propTypes = {
  editDigestId: PropTypes.number,
  dispatchTemplates: PropTypes.func,
  dispatchTypes: PropTypes.func,
  dispatchRepeat: PropTypes.func,
  dispatchContentTypes: PropTypes.func,
  templates: PropTypes.array,
  types: PropTypes.array,
  repeat: PropTypes.array,
  contentTypes: PropTypes.array,
  currentUser: PropTypes.object,
  dispatchCommunityList: PropTypes.func,
  dispatchFilterCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  dispatchCreateDigest: PropTypes.func,
  dispatchCloseCreateDigest: PropTypes.func,
  dispatchDigestContent: PropTypes.func,
  digestContent: PropTypes.object,
  createDigestSuccess: PropTypes.bool,
  dispatchCleanCreateDigest: PropTypes.func,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    templates: makeSelectTemplates(),
    types: makeSelectTypes(),
    repeat: makeSelectRepeat(),
    contentTypes: makeSelectContentTypes(),
    communityList: makeSelectCommunityList(),
    communityListLoading: makeSelectCommunityListLoading(),
    digestContent: makeSelectDigestById(props.editDigestId),
    createDigestSuccess: makeSelectCreateDigestSuccess(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchTemplates: () => dispatch(templatesAction()),
    dispatchTypes: () => dispatch(typesAction()),
    dispatchRepeat: () => dispatch(repeatAction()),
    dispatchContentTypes: () => dispatch(contentTypesAction()),
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchFilterCommunityList: options =>
      dispatch(filterCommunityList(options)),
    dispatchCreateDigest: options => dispatch(createDigest(options)),
    dispatchCloseCreateDigest: () => dispatch(closeCreateDigest()),
    dispatchDigestContent: options => dispatch(digestContentAction(options)),
    dispatchCleanCreateDigest: () => dispatch(cleanCreateDigest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateDigest);
