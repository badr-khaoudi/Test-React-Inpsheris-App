/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/**
 *
 * MySearch
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import Sticky from 'react-stickynode';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  Container,
  Grid,
  Typography,
  FormControlLabel,
  TextField,
  Divider,
  Avatar,
  ListItemText,
  Chip,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import {
  makeSelectYammerIntegration,
  makeSelectFaqTab,
} from 'containers/AuthBase/selectors';
import {
  makeSelectSuggestion,
  makeSelectExternalSites,
  makeSelectSearch,
  makeSelectFileType,
  makeSelectCommunityList,
  makeSelectAuthorList,
  makeSelectSearchLoading,
  makeSelectSuggestionLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  suggestion,
  externalSites as externalSitesAction,
  search as searchAction,
  searchMore,
  getFileType,
  getCommunityList,
  getAuthorList,
  communityFiles,
  communityFilesMore,
} from './actions';
import ExternalResults from './ExternalResults';
import Members from './Members';
import Communities from './Communities';
import Contents from './Contents';
import AllFiles from './AllFiles';
import Files from './Files';
import Links from './Links';
import YammerLinks from './YammerLinks';
import FAQ from './FAQ';
import Widgets from './Widgets';
// import messages from './messages';

const filters = [
  { value: 'all', label: 'All' },
  {
    value: 'people',
    label: 'People',
    type: 'profile',
    total: ['totalMembers'],
  },
  {
    value: 'community',
    label: 'Communities',
    type: 'community',
    total: ['totalCommunities'],
  },
  {
    value: 'article',
    label: 'Article',
    type: 'article',
    total: ['totalContents'],
  },
  {
    value: 'quickpost',
    label: 'Quickpost',
    type: 'quickpost',
    total: ['totalQuickposts'],
  },
  { value: 'event', label: 'Event', type: 'event', total: ['totalEvents'] },
  {
    value: 'file',
    label: 'File',
    type: 'file',
    total: ['totalCommunityFiles', 'totalGdriveFiles'],
  },
  { value: 'widget', label: 'Widget', type: 'widget', total: ['totalWidgets'] },
  {
    value: 'link',
    label: 'Link',
    type: 'link',
    total: ['totalUsefulLinks', 'totalDigitalWorkplaceApplications'],
  },
  {
    value: 'yammer',
    label: 'Yammer',
    type: 'yammer',
    total: ['totalYammerLinks'],
  },
  { value: 'faqquestion', label: 'FAQ', type: 'faqquestion' },
];

export function MySearch(props) {
  useInjectReducer({ key: 'mySearch', reducer });
  useInjectSaga({ key: 'mySearch', saga });

  const {
    match,
    history,
    yammerIntegration,
    faqTab,
    dispatchSuggestion,
    suggestions,
    externalSites,
    dispatchExternalSites,
    dispatchSearch,
    dispatchSearchMore,
    search,
    dispatchGetFileType,
    dispatchGetCommunityList,
    dispatchGetAuthorList,
    fileType,
    communityList,
    authorList,
    dispatchCommunityFiles,
    dispatchCommunityFilesMore,
    searchLoading,
    suggestionLoading,
  } = props;
  const [filter, setFilter] = useState('all');
  const [allFilters, setAllFilters] = useState([]);
  const [scope, setScope] = useState('global');
  const [searchText, setSearchText] = useState('');
  const [isInternal, setIsInternal] = useState(true);
  const [isExternal, setIsExternal] = useState(false);
  const [otherFilters, setOtherFilters] = useState({
    externalTypes: [],
    authorFilter: [],
    communityFilter: [],
    typeFilter: [],
    dateFrom: undefined,
    dateTo: undefined,
    isAnswered: undefined,
  });
  const [activeTab, setActiveTab] = useState('');
  const [memberPage, setMemberPage] = useState(1);
  const [communityPage, setCommunityPage] = useState(1);
  const [contentPage, setContentPage] = useState(1);
  const [filePage, setFilePage] = useState(1);
  const [allFilePage, setAllFilePage] = useState(1);
  const [linkPage, setLinkPage] = useState(1);
  const [yammerLinkPage, setYammerLinkPage] = useState(1);
  const [widgetPage, setWidgetPage] = useState(1);

  useEffect(() => {
    if (memberPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: memberPage,
        searchText,
        type: 'profile',
      });
    }
  }, [memberPage]);

  useEffect(() => {
    if (communityPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: communityPage,
        searchText,
        type: 'community',
      });
    }
  }, [communityPage]);

  useEffect(() => {
    const { externalTypes, ...rest } = otherFilters;
    if (contentPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: contentPage,
        searchText,
        type: _.find(filters, { value: filter }).type,
        ...rest,
      });
    }
  }, [contentPage]);

  useEffect(() => {
    const { externalTypes, ...rest } = otherFilters;
    if (allFilePage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: allFilePage,
        searchText,
        type: 'file',
        ...rest,
      });
    }
  }, [allFilePage]);

  useEffect(() => {
    const { externalTypes, ...rest } = otherFilters;
    if (filePage > 1) {
      dispatchCommunityFilesMore({
        itemsPerPage: 10,
        page: filePage,
        q: searchText,
        sortField: 'fileName',
        sortKey: 'asc',
        ...rest,
      });
    }
  }, [filePage]);

  useEffect(() => {
    if (linkPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: linkPage,
        searchText,
        type: 'link',
        externalType: otherFilters.externalTypes,
      });
    }
  }, [linkPage]);

  useEffect(() => {
    if (yammerLinkPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: yammerLinkPage,
        searchText,
        type: 'yammer',
      });
    }
  }, [yammerLinkPage]);

  useEffect(() => {
    if (widgetPage > 1) {
      dispatchSearchMore({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: widgetPage,
        searchText,
        type: 'widget',
      });
    }
  }, [widgetPage]);

  useEffect(() => {
    if (
      filter === 'article' ||
      filter === 'quickpost' ||
      filter === 'event' ||
      filter === 'file'
    ) {
      if (_.isEmpty(fileType)) {
        dispatchGetFileType();
      }
      if (_.isEmpty(authorList)) {
        dispatchGetAuthorList({ isAll: true });
      }
    }
    if (
      filter === 'faqquestion' ||
      filter === 'article' ||
      filter === 'quickpost' ||
      filter === 'event' ||
      filter === 'file'
    ) {
      if (_.isEmpty(communityList)) {
        dispatchGetCommunityList({
          filter: 'lively',
          format: 'list',
          gplusCommunity: 'ALL',
        });
      }
    }
  }, [filter]);

  useEffect(() => {
    dispatchExternalSites();
  }, []);

  const handleExternalTypes = option => {
    if (option.checked) {
      setOtherFilters({
        ...otherFilters,
        externalTypes: [...otherFilters.externalTypes, option.value],
      });
    } else {
      setOtherFilters({
        ...otherFilters,
        externalTypes: _.filter(
          otherFilters.externalTypes,
          type => type !== option.value,
        ),
      });
    }
  };

  useEffect(() => {
    if (history.location.state === undefined && match.params.scope) {
      let other;
      if (match.params.otherFilters) {
        try {
          other = JSON.parse(atob(match.params.otherFilters));
        } catch (error) {
          console.log(error);
        }
      }
      setScope(match.params.scope);
      setFilter(match.params.filter);
      setSearchText(decodeURIComponent(match.params.searchText) || '');
      setIsInternal(match.params.isInternal === 'true');
      setIsExternal(match.params.isExternal === 'true');
      setOtherFilters({ ...otherFilters, ...other });
      if (other === undefined) {
        dispatchSearch({
          isExternal,
          isInternal,
          itemsPerPage: 18,
          language: 'fr',
          page: 1,
          searchText: decodeURIComponent(match.params.searchText),
          type: _.find(filters, { value: filter }).type,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!yammerIntegration.value || !faqTab.value) {
      setAllFilters(
        _.filter(
          filters,
          f => f.value !== 'yammer' || f.value !== 'faqquestion',
        ),
      );
    } else if (!yammerIntegration.value) {
      setAllFilters(_.filter(filters, f => f.value !== 'yammer'));
    } else if (!faqTab.value) {
      setAllFilters(_.filter(filters, f => f.value !== 'faqquestion'));
    } else {
      setAllFilters(filters);
    }
  }, [yammerIntegration, faqTab]);

  const handleFilter = () => {
    history.push({
      pathname: `/search/general/${filter}/${scope}/${encodeURIComponent(
        searchText,
      )}/${isInternal}/${isExternal}/${btoa(JSON.stringify(otherFilters))}`,
      state: true,
    });
    const { externalTypes, ...rest } = otherFilters;
    if (
      (searchText !== '' ||
        filter === 'article' ||
        filter === 'quickpost' ||
        filter === 'event' ||
        filter === 'faqquestion') &&
      filter !== 'file'
    ) {
      dispatchSearch({
        isExternal,
        isInternal,
        itemsPerPage: 18,
        language: 'fr',
        page: 1,
        searchText,
        externalType: externalTypes,
        ...rest,
        type: _.find(filters, { value: filter }).type,
      });
    }
    if (filter === 'file' && searchText !== '') {
      dispatchCommunityFiles({
        itemsPerPage: 10,
        page: 1,
        q: searchText,
        sortField: 'fileName',
        sortKey: 'asc',
        ...rest,
      });
    }
  };

  const hasFilter = useRef(false);

  useEffect(() => {
    if (!hasFilter.current) {
      hasFilter.current = true;
      return;
    }
    setMemberPage(1);
    setCommunityPage(1);
    setContentPage(1);
    setFilePage(1);
    setLinkPage(1);
    setYammerLinkPage(1);
    setWidgetPage(1);
  }, [filter]);

  const hasOtherFilter = useRef(false);

  useEffect(() => {
    if (!hasOtherFilter.current) {
      hasOtherFilter.current = true;
      return;
    }
    handleFilter();
  }, [
    filter,
    otherFilters.authorFilter,
    otherFilters.communityFilter,
    otherFilters.typeFilter,
    otherFilters.dateFrom,
    otherFilters.dateTo,
    otherFilters.isAnswered,
  ]);

  useEffect(() => {
    if (activeTab === '') {
      if (_.isEmpty(otherFilters.externalTypes)) {
        if (filter === 'all') {
          setActiveTab('profile');
          // eslint-disable-next-line consistent-return
          _.forEach(allFilters, f => {
            if (f.total) {
              const totalResult = _.reduce(
                _.map(f.total, t => search[t]),
                (sum, n) => sum + n,
              );
              if (totalResult) {
                setActiveTab(f.type);
                return false;
              }
            }
          });
        }
        if (filter === 'link' && search.totalUsefulLinks) {
          setActiveTab('link');
        }
      }
      if (!_.isEmpty(otherFilters.externalTypes) && search.externalResult) {
        // eslint-disable-next-line consistent-return
        _.forEach(externalSites, site => {
          const totalResult = _.size(
            search.externalResult[`${site.toLowerCase()}Results`],
          );
          if (totalResult) {
            setActiveTab(site);
            return false;
          }
        });
      }
    }
  }, [search]);

  const cancelToken = useRef();

  return (
    <>
      <Helmet>
        <title>MySearch</title>
        <meta name="description" content="Description of MySearch" />
      </Helmet>
      <Paper square>
        <Container maxWidth="lg" style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography variant="h4">Filter My Search</Typography>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                <Grid container spacing={2}>
                  {_.map(allFilters, (f, index) => (
                    <Grid item xs={3} key={index}>
                      <FormControlLabel
                        value={f.value}
                        control={<Radio />}
                        label={f.label}
                      />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <Autocomplete
                    fullWidth
                    freeSolo
                    value={searchText}
                    size="small"
                    onChange={(event, newValue) => {
                      setSearchText(newValue || '');
                      handleFilter();
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        setSearchText(e.target.value);
                        handleFilter();
                        cancelToken.current.cancel('onKeyDown Cancel');
                      }
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (
                        event &&
                        event.type === 'change' &&
                        filter !== 'link'
                      ) {
                        cancelToken.current = axios.CancelToken.source();
                        dispatchSuggestion(
                          {
                            filter: _.find(filters, { value: filter }).value,
                            language: 'fr',
                            q: newInputValue,
                            searchType: scope,
                          },
                          { cancelToken: cancelToken.current.token },
                        );
                      }
                      setSearchText(newInputValue);
                    }}
                    options={suggestions}
                    loading={suggestionLoading}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Search"
                        variant="outlined"
                        autoFocus
                      />
                    )}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ height: '100%' }}
                    disableElevation
                    onClick={handleFilter}
                  >
                    <Search />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isInternal}
                        onChange={e => setIsInternal(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Search Internal"
                  />
                </Grid>
                {(filter === 'all' || filter === 'link') && (
                  <>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isExternal}
                            onChange={e => setIsExternal(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Search External"
                      />
                    </Grid>
                    {isExternal && (
                      <>
                        <Divider
                          orientation="vertical"
                          flexItem
                          style={{ marginRight: 10 }}
                        />
                        {_.map(externalSites, (site, index) => (
                          <Grid item key={index}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value={site}
                                  checked={_.includes(
                                    otherFilters.externalTypes,
                                    site,
                                  )}
                                  onChange={e => handleExternalTypes(e.target)}
                                  color="primary"
                                />
                              }
                              label={site}
                            />
                          </Grid>
                        ))}
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            {(filter === 'article' ||
              filter === 'quickpost' ||
              filter === 'event' ||
              filter === 'file') && (
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={3}>
                  Community
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    size="small"
                    onChange={(event, newValue) =>
                      setOtherFilters({
                        ...otherFilters,
                        communityFilter: _.map(newValue, ({ uid }) => uid),
                      })
                    }
                    options={communityList}
                    getOptionLabel={option => option.label}
                    renderOption={(option, { selected }) => (
                      <>
                        <Checkbox checked={selected} />
                        {option.label}
                      </>
                    )}
                    renderTags={value => (
                      <Chip
                        label={`${_.size(value)} selected`}
                        variant="outlined"
                      />
                    )}
                    renderInput={params => (
                      <TextField
                        placeholder="Select Community"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  File Type
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Select Type"
                    select
                    SelectProps={{
                      multiple: true,
                      renderValue: selected => selected.join(', '),
                      value: otherFilters.typeFilter,
                      onChange: e =>
                        setOtherFilters({
                          ...otherFilters,
                          typeFilter: e.target.value,
                        }),
                    }}
                  >
                    {_.map(fileType, type => (
                      <MenuItem key={type} value={type} dense>
                        <Checkbox
                          checked={
                            _.indexOf(otherFilters.typeFilter, type) > -1
                          }
                          color="primary"
                        />
                        <ListItemText primary={type} />
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  Uploaded By
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    size="small"
                    onChange={(event, newValue) => {
                      setOtherFilters({
                        ...otherFilters,
                        authorFilter: _.map(newValue, ({ uid }) => uid),
                      });
                    }}
                    options={authorList}
                    getOptionLabel={option =>
                      `${option.firstName} ${option.lastName}`
                    }
                    renderOption={(option, { selected }) => (
                      <>
                        <Checkbox checked={selected} />
                        <Avatar
                          src={option.headerLogoUrl}
                          style={{ marginRight: 10 }}
                        >
                          {initials([option.firstName, option.lastName])}
                        </Avatar>
                        {`${option.firstName} ${option.lastName}`}
                      </>
                    )}
                    renderTags={value => (
                      <Chip
                        label={`${_.size(value)} selected`}
                        variant="outlined"
                      />
                    )}
                    renderInput={params => (
                      <TextField
                        placeholder="Select Author"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  Date
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MMM dd, yyyy"
                        value={otherFilters.dateFrom || null}
                        onChange={date =>
                          setOtherFilters({ ...otherFilters, dateFrom: date })
                        }
                        autoOk
                        disableFuture
                        TextFieldComponent={textFieldProps => (
                          <TextField
                            {...textFieldProps}
                            size="small"
                            variant="outlined"
                            InputProps={{
                              ...textFieldProps.InputProps,
                              style: { paddingRight: 0 },
                            }}
                            placeholder="From"
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
                        value={otherFilters.dateTo || null}
                        onChange={date =>
                          setOtherFilters({ ...otherFilters, dateTo: date })
                        }
                        autoOk
                        disableFuture
                        TextFieldComponent={textFieldProps => (
                          <TextField
                            {...textFieldProps}
                            size="small"
                            variant="outlined"
                            InputProps={{
                              ...textFieldProps.InputProps,
                              style: { paddingRight: 0 },
                            }}
                            placeholder="To"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Paper>
      {searchLoading && (
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Typography variant="h4">Loading</Typography>
        </Container>
      )}
      {!_.isEmpty(search) && (
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Typography variant="h5" gutterBottom>
            {`Total result(s): ${search.total}`}
          </Typography>
          {(filter === 'all' || filter === 'link') && (
            <Sticky top={71} innerZ={1099}>
              <Paper square>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={activeTab}
                  onChange={(e, val) => setActiveTab(val)}
                >
                  {isExternal &&
                    search.externalResult &&
                    _.map(externalSites, (site, index) => {
                      const totalResult = _.size(
                        search.externalResult[`${site.toLowerCase()}Results`],
                      );
                      if (totalResult) {
                        return (
                          <Tab
                            label={`${site} (${totalResult})`}
                            value={site}
                            key={`${site}${index}`}
                          />
                        );
                      }
                      return null;
                    })}
                  {_.map(
                    _.filter(allFilters, f =>
                      filter === 'all' ? f : f.type === filter,
                    ),
                    (f, index) => {
                      if (f.total) {
                        const totalResult = _.reduce(
                          _.map(f.total, t => search[t]),
                          (sum, n) => sum + n,
                        );
                        if (totalResult) {
                          return (
                            <Tab
                              label={`${f.label} (${totalResult})`}
                              value={f.type}
                              key={index}
                            />
                          );
                        }
                      }
                      return null;
                    },
                  )}
                </Tabs>
              </Paper>
            </Sticky>
          )}
          {(filter === 'all' || filter === 'link') &&
            activeTab === 'Google' && <ExternalResults type="googleResults" />}
          {(filter === 'all' || filter === 'link') && activeTab === 'Qwant' && (
            <ExternalResults type="qwantResults" />
          )}
          {(filter === 'all' || filter === 'link') &&
            activeTab === 'Ecosia' && <ExternalResults type="ecosiaResults" />}
          {(filter === 'people' ||
            (filter === 'all' && activeTab === 'profile')) && (
            <Members page={memberPage} setPage={setMemberPage} />
          )}
          {(filter === 'community' ||
            (filter === 'all' && activeTab === 'community')) && (
            <Communities page={communityPage} setPage={setCommunityPage} />
          )}
          {(filter === 'article' ||
            filter === 'quickpost' ||
            filter === 'event' ||
            (filter === 'all' && activeTab === 'article')) && (
            <Contents page={contentPage} setPage={setContentPage} />
          )}
          {filter === 'all' && activeTab === 'file' && (
            <AllFiles page={allFilePage} setPage={setAllFilePage} />
          )}
          {(filter === 'all' || filter === 'link') && activeTab === 'link' && (
            <Links page={linkPage} setPage={setLinkPage} />
          )}
          {(filter === 'yammer' ||
            (filter === 'all' && activeTab === 'yammer')) && (
            <YammerLinks page={yammerLinkPage} setPage={setYammerLinkPage} />
          )}
          {(filter === 'widget' ||
            (filter === 'all' && activeTab === 'widget')) && (
            <Widgets page={widgetPage} setPage={setWidgetPage} />
          )}
        </Container>
      )}
      {filter === 'file' && (
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Files page={filePage} setPage={setFilePage} />
        </Container>
      )}
      {filter === 'faqquestion' && (
        <Container maxWidth="lg" style={{ paddingTop: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Button
                style={{ height: '100%' }}
                color="primary"
                fullWidth
                variant={
                  otherFilters.isAnswered !== undefined &&
                  otherFilters.isAnswered === false
                    ? 'contained'
                    : 'outlined'
                }
                onClick={() =>
                  setOtherFilters({
                    ...otherFilters,
                    isAnswered:
                      otherFilters.isAnswered === undefined
                        ? false
                        : otherFilters.isAnswered === false
                        ? undefined
                        : !otherFilters.isAnswered,
                  })
                }
                disableElevation
              >
                Sans réponse
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={{ height: '100%' }}
                color="primary"
                fullWidth
                variant={
                  otherFilters.isAnswered !== undefined &&
                  otherFilters.isAnswered
                    ? 'contained'
                    : 'outlined'
                }
                onClick={() =>
                  setOtherFilters({
                    ...otherFilters,
                    isAnswered:
                      otherFilters.isAnswered === undefined
                        ? true
                        : otherFilters.isAnswered === true
                        ? undefined
                        : !otherFilters.isAnswered,
                  })
                }
                disableElevation
              >
                Répondu
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                disableCloseOnSelect
                multiple
                onChange={(event, newValue) =>
                  setOtherFilters({
                    ...otherFilters,
                    communityFilter: _.map(newValue, ({ uid }) => uid),
                  })
                }
                options={communityList}
                getOptionLabel={option => option.label}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox checked={selected} />
                    {option.label}
                  </>
                )}
                renderTags={() => null}
                renderInput={params => (
                  <TextField
                    placeholder="Select Community"
                    variant="outlined"
                    {...params}
                    size="small"
                  />
                )}
              />
            </Grid>
          </Grid>
          <FAQ page={contentPage} setPage={setContentPage} />
        </Container>
      )}
    </>
  );
}

MySearch.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  yammerIntegration: PropTypes.object,
  faqTab: PropTypes.object,
  dispatchSuggestion: PropTypes.func,
  suggestions: PropTypes.array,
  externalSites: PropTypes.array,
  dispatchExternalSites: PropTypes.func,
  dispatchSearch: PropTypes.func,
  dispatchSearchMore: PropTypes.func,
  search: PropTypes.object,
  dispatchGetFileType: PropTypes.func,
  dispatchGetCommunityList: PropTypes.func,
  dispatchGetAuthorList: PropTypes.func,
  fileType: PropTypes.array,
  communityList: PropTypes.array,
  authorList: PropTypes.array,
  dispatchCommunityFiles: PropTypes.func,
  dispatchCommunityFilesMore: PropTypes.func,
  searchLoading: PropTypes.bool,
  suggestionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  yammerIntegration: makeSelectYammerIntegration(),
  faqTab: makeSelectFaqTab(),
  suggestions: makeSelectSuggestion(),
  externalSites: makeSelectExternalSites(),
  search: makeSelectSearch(),
  fileType: makeSelectFileType(),
  communityList: makeSelectCommunityList(),
  authorList: makeSelectAuthorList(),
  searchLoading: makeSelectSearchLoading(),
  suggestionLoading: makeSelectSuggestionLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSuggestion: (options, config) =>
      dispatch(suggestion(options, config)),
    dispatchExternalSites: () => dispatch(externalSitesAction()),
    dispatchSearch: options => dispatch(searchAction(options)),
    dispatchSearchMore: options => dispatch(searchMore(options)),
    dispatchGetFileType: () => dispatch(getFileType()),
    dispatchGetCommunityList: options => dispatch(getCommunityList(options)),
    dispatchGetAuthorList: options => dispatch(getAuthorList(options)),
    dispatchCommunityFiles: options => dispatch(communityFiles(options)),
    dispatchCommunityFilesMore: options =>
      dispatch(communityFilesMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MySearch);
