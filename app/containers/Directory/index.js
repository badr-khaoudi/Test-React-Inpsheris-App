/**
 *
 * Directory
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Search } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectSuggestion,
  makeSelectSiteFilterOptions,
  makeSelectServiceFilterOptions,
  makeSelectHobbyFilterOptions,
  makeSelectSkillFilterOptions,
  makeSelectVariableFilterOptions,
  makeSelectBadgeFilterOptions,
  makeSelectSiteFilterOptionsLoading,
  makeSelectServiceFilterOptionsLoading,
  makeSelectHobbyFilterOptionsLoading,
  makeSelectSkillFilterOptionsLoading,
  makeSelectVariableFilterOptionsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  searchDirectory,
  searchDirectoryMore,
  suggestion,
  siteFilterOptions as siteFilterOptionsAction,
  serviceFilterOptions as serviceFilterOptionsAction,
  hobbyFilterOptions as hobbyFilterOptionsAction,
  skillFilterOptions as skillFilterOptionsAction,
  variableFilterOptions as variableFilterOptionsAction,
  badgeFilterOptions as badgeFilterOptionsAction,
} from './actions';
import Members from './Members';

export function Directory(props) {
  useInjectReducer({ key: 'directory', reducer });
  useInjectSaga({ key: 'directory', saga });

  const {
    match,
    history,
    dispatchSearchDirectory,
    dispatchSearchDirectoryMore,
    dispatchSuggestion,
    suggestions,
    dispatchSiteFilterOptions,
    dispatchServiceFilterOptions,
    dispatchHobbyFilterOptions,
    dispatchSkillFilterOptions,
    dispatchVariableFilterOptions,
    dispatchBadgeFilterOptions,
    siteFilterOptions,
    serviceFilterOptions,
    hobbyFilterOptions,
    skillFilterOptions,
    variableFilterOptions,
    badgeFilterOptions,
    siteFilterOptionsLoading,
    serviceFilterOptionsLoading,
    hobbyFilterOptionsLoading,
    skillFilterOptionsLoading,
    variableFilterOptionsLoading,
  } = props;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [allFilters, setAllFilters] = useState({
    siteFilter: null,
    serviceFilter: null,
    hobbyFilter: null,
    skillFilter: null,
    variable2Filter: null,
    badgeFilter: [],
  });
  const [isRandom, setIsRandom] = useState(true);
  // const [departmentFilter, setDepartmentFilter] = useState('');
  // const [divisionFilter, setDivisionFilter] = useState('');

  useEffect(() => {
    if (_.isEmpty(badgeFilterOptions)) {
      dispatchBadgeFilterOptions();
    }
    if (
      history.location.state === undefined &&
      match.params.filters !== 'all'
    ) {
      let filters;
      try {
        filters = JSON.parse(atob(match.params.filters));
      } catch (error) {
        console.log(error);
      }
      setIsRandom(false);
      setSearchText(match.params.searchText || '');
      setAllFilters(filters);
    } else if (match.params.scope === 'random') {
      setIsRandom(true);
      dispatchSearchDirectory({
        itemsPerPage: 18,
        numberOfUserRandom: 4,
        page: 1,
        random: true,
      });
    }
  }, [match.params.filters, match.params.scope]);

  useEffect(() => {
    if (allFilters.siteFilter !== null) {
      dispatchServiceFilterOptions({
        field: 'service',
        site: allFilters.siteFilter,
      });
    }
  }, [allFilters.siteFilter]);

  const handleFilter = () => {
    setIsRandom(false);
    const filters = btoa(
      JSON.stringify({
        ...allFilters,
      }),
    );
    history.replace({
      pathname: `/search/directory/${filters}/global/${searchText}`,
      state: true,
    });
    dispatchSearchDirectory({
      searchText,
      ...allFilters,
      itemsPerPage: 18,
      page: 1,
    });
  };

  const hasFilter = useRef(false);

  useEffect(() => {
    if (!hasFilter.current) {
      hasFilter.current = true;
      return;
    }
    if (hasFilter.current) {
      handleFilter();
    }
  }, [allFilters]);

  useEffect(() => {
    if (page > 1) {
      dispatchSearchDirectoryMore({
        searchText,
        ...allFilters,
        itemsPerPage: 18,
        page,
      });
    }
  }, [page]);

  const handleBadgeFilterOptions = option => {
    if (option.checked) {
      setAllFilters({
        ...allFilters,
        badgeFilter: [...allFilters.badgeFilter, option.value],
      });
    } else {
      setAllFilters({
        ...allFilters,
        badgeFilter: _.filter(
          allFilters.badgeFilter,
          badge => badge !== option.value,
        ),
      });
    }
  };

  const cancelToken = useRef();

  return (
    <>
      <Helmet>
        <title>Directory</title>
        <meta name="description" content="Description of Directory" />
      </Helmet>
      <Paper square>
        <Container maxWidth="lg" style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography variant="h4">Directory</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    style={{ height: '100%' }}
                  >
                    Organigramme
                  </Button>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Autocomplete
                        fullWidth
                        freeSolo
                        value={searchText}
                        size="small"
                        onChange={(event, newValue) => {
                          setSearchText(newValue);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            setSearchText(e.target.value);
                            handleFilter();
                            cancelToken.current.cancel('onKeyDown Cancel');
                          }
                        }}
                        onInputChange={(event, newInputValue) => {
                          if (event && event.type === 'change') {
                            cancelToken.current = axios.CancelToken.source();
                            dispatchSuggestion(
                              {
                                filter: 'all',
                                language: 'fr',
                                q: newInputValue,
                                searchType: 'directory',
                              },
                              { cancelToken: cancelToken.current.token },
                            );
                          }
                          setSearchText(newInputValue);
                        }}
                        options={suggestions}
                        renderInput={params => (
                          <TextField
                            {...params}
                            placeholder="Directory Search"
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
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Autocomplete
                    fullWidth
                    value={allFilters.siteFilter}
                    size="small"
                    onChange={(event, newValue) => {
                      setAllFilters({ ...allFilters, siteFilter: newValue });
                    }}
                    onOpen={() => {
                      if (_.isEmpty(siteFilterOptions)) {
                        dispatchSiteFilterOptions({ field: 'site' });
                      }
                    }}
                    loading={siteFilterOptionsLoading}
                    options={siteFilterOptions}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Site"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    fullWidth
                    value={allFilters.serviceFilter}
                    size="small"
                    onChange={(event, newValue) => {
                      setAllFilters({ ...allFilters, serviceFilter: newValue });
                    }}
                    loading={serviceFilterOptionsLoading}
                    options={serviceFilterOptions}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Service"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Autocomplete
                    fullWidth
                    value={allFilters.hobbyFilter}
                    size="small"
                    onChange={(event, newValue) => {
                      setAllFilters({ ...allFilters, hobbyFilter: newValue });
                    }}
                    onOpen={() => {
                      if (_.isEmpty(hobbyFilterOptions)) {
                        dispatchHobbyFilterOptions();
                      }
                    }}
                    loading={hobbyFilterOptionsLoading}
                    options={_.map(hobbyFilterOptions.rows, ({ name }) => name)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Hobby"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    fullWidth
                    value={allFilters.skillFilter}
                    size="small"
                    onChange={(event, newValue) => {
                      setAllFilters({ ...allFilters, skillFilter: newValue });
                    }}
                    onOpen={() => {
                      if (_.isEmpty(skillFilterOptions)) {
                        dispatchSkillFilterOptions({ type: 'Skill' });
                      }
                    }}
                    loading={skillFilterOptionsLoading}
                    options={_.map(skillFilterOptions.rows, ({ name }) => name)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Skill"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    fullWidth
                    value={allFilters.variable2Filter}
                    size="small"
                    onChange={(event, newValue) => {
                      setAllFilters({
                        ...allFilters,
                        variable2Filter: newValue,
                      });
                    }}
                    onOpen={() => {
                      if (_.isEmpty(variableFilterOptions)) {
                        dispatchVariableFilterOptions({ type: 'Other' });
                      }
                    }}
                    loading={variableFilterOptionsLoading}
                    options={_.map(
                      variableFilterOptions.rows,
                      ({ name }) => name,
                    )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        placeholder="Personal Skill"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {_.map(badgeFilterOptions, badge => (
                  <Grid item xs={4} key={badge.name}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={badge.name}
                          checked={_.includes(
                            allFilters.badgeFilter,
                            badge.name,
                          )}
                          onChange={e => handleBadgeFilterOptions(e.target)}
                          color="primary"
                        />
                      }
                      label={badge.name}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Members page={page} setPage={setPage} isRandom={isRandom} />
    </>
  );
}

Directory.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  dispatchSearchDirectory: PropTypes.func,
  dispatchSearchDirectoryMore: PropTypes.func,
  dispatchSuggestion: PropTypes.func,
  suggestions: PropTypes.array,
  dispatchSiteFilterOptions: PropTypes.func,
  dispatchServiceFilterOptions: PropTypes.func,
  dispatchHobbyFilterOptions: PropTypes.func,
  dispatchSkillFilterOptions: PropTypes.func,
  dispatchVariableFilterOptions: PropTypes.func,
  dispatchBadgeFilterOptions: PropTypes.func,
  siteFilterOptions: PropTypes.array,
  serviceFilterOptions: PropTypes.array,
  hobbyFilterOptions: PropTypes.object,
  skillFilterOptions: PropTypes.object,
  variableFilterOptions: PropTypes.object,
  badgeFilterOptions: PropTypes.array,
  siteFilterOptionsLoading: PropTypes.bool,
  serviceFilterOptionsLoading: PropTypes.bool,
  hobbyFilterOptionsLoading: PropTypes.bool,
  skillFilterOptionsLoading: PropTypes.bool,
  variableFilterOptionsLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  suggestions: makeSelectSuggestion(),
  siteFilterOptions: makeSelectSiteFilterOptions(),
  serviceFilterOptions: makeSelectServiceFilterOptions(),
  hobbyFilterOptions: makeSelectHobbyFilterOptions(),
  skillFilterOptions: makeSelectSkillFilterOptions(),
  variableFilterOptions: makeSelectVariableFilterOptions(),
  badgeFilterOptions: makeSelectBadgeFilterOptions(),
  siteFilterOptionsLoading: makeSelectSiteFilterOptionsLoading(),
  serviceFilterOptionsLoading: makeSelectServiceFilterOptionsLoading(),
  hobbyFilterOptionsLoading: makeSelectHobbyFilterOptionsLoading(),
  skillFilterOptionsLoading: makeSelectSkillFilterOptionsLoading(),
  variableFilterOptionsLoading: makeSelectVariableFilterOptionsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSearchDirectory: options => dispatch(searchDirectory(options)),
    dispatchSearchDirectoryMore: options =>
      dispatch(searchDirectoryMore(options)),
    dispatchSuggestion: (options, config) =>
      dispatch(suggestion(options, config)),
    dispatchSiteFilterOptions: options =>
      dispatch(siteFilterOptionsAction(options)),
    dispatchServiceFilterOptions: options =>
      dispatch(serviceFilterOptionsAction(options)),
    dispatchHobbyFilterOptions: options =>
      dispatch(hobbyFilterOptionsAction(options)),
    dispatchSkillFilterOptions: options =>
      dispatch(skillFilterOptionsAction(options)),
    dispatchVariableFilterOptions: options =>
      dispatch(variableFilterOptionsAction(options)),
    dispatchBadgeFilterOptions: options =>
      dispatch(badgeFilterOptionsAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Directory);
