/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * LinkDocumentLibrary
 *
 */

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import axios from 'axios';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Link,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import { Close } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Folder } from 'components/Icons';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { makeSelectContents, makeSelectContentsLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  sharePointSites,
  searchSharePointSites,
  documentLibraries,
  listItemsDrive,
  listChildrenDriveItem,
  searchDriveItems,
  searchChildrenDriveItem,
} from './actions';

const LoadingSkeleton = () =>
  _.map(_.range(4), index => (
    <Skeleton
      key={index}
      variant="rect"
      height={45}
      style={{ marginBottom: 5 }}
    />
  ));

export function LinkDocumentLibrary(props) {
  useInjectReducer({ key: 'linkDocumentLibrary', reducer });
  useInjectSaga({ key: 'linkDocumentLibrary', saga });

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const {
    dispatchSharePointSites,
    dispatchSearchSharePointSites,
    dispatchDocumentLibraries,
    dispatchListItemsDrive,
    dispatchListChildrenDriveItem,
    dispatchSearchDriveItems,
    dispatchSearchChildrenDriveItem,
    contents,
    contentsLoading,
    handleClose,
    handleOk,
  } = props;

  const cancelToken = useRef();

  const [search, setSearch] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [contentId, setContentId] = useState('');

  const handleSharePointSites = () => {
    setContentId('');
    clickRef.current = false;
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
    cancelToken.current = axios.CancelToken.source();
    dispatchSharePointSites({ search: '' }, cancelToken.current.token);
    setBreadcrumbs([]);
  };

  const activeFolder = useMemo(() => _.last(breadcrumbs), [breadcrumbs]);

  const [placeholder, setPlaceholder] = useState('Search sites');
  const clickRef = useRef(false);
  const searchRef = useRef(false);

  useEffectAfterMount(() => {
    if (!activeFolder) {
      setPlaceholder('Search sites');
    } else if (activeFolder.driveType && !_.isEmpty(activeFolder.quota)) {
      setPlaceholder(`Search in ${activeFolder.name}`);
    } else if (
      !_.isEmpty(activeFolder.folder) &&
      !_.isEmpty(activeFolder.parentReference)
    ) {
      setPlaceholder(`Search in ${activeFolder.name}`);
    } else {
      setPlaceholder(undefined);
    }
  }, [activeFolder]);

  useEffectAfterMount(() => {
    if (searchRef.current) {
      if (cancelToken.current) {
        cancelToken.current.cancel();
      }
      cancelToken.current = axios.CancelToken.source();
      clickRef.current = false;
      searchRef.current = false;
      if (!activeFolder) {
        dispatchSearchSharePointSites({ search }, cancelToken.current.token);
      } else if (activeFolder.driveType && !_.isEmpty(activeFolder.quota)) {
        dispatchSearchDriveItems(
          activeFolder.id,
          search,
          undefined,
          cancelToken.current.token,
        );
      } else if (
        !_.isEmpty(activeFolder.folder) &&
        !_.isEmpty(activeFolder.parentReference)
      ) {
        clickRef.current = true;
        dispatchSearchChildrenDriveItem(
          activeFolder.parentReference.driveId,
          activeFolder.id,
          search,
          undefined,
          cancelToken.current.token,
        );
      }
    }
  }, [search]);

  useEffect(() => {
    if (!isAuthenticated) {
      (async () => {
        await instance.loginPopup({
          scopes: ['User.Read', 'Files.Read.All', 'Sites.Read.All'],
          prompt: 'select_account',
        });
      })();
    }
    cancelToken.current = axios.CancelToken.source();
    dispatchSharePointSites({ search }, cancelToken.current.token);
  }, []);

  const handleContentClick = useCallback((e, content, caller) => {
    e.preventDefault();
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
    cancelToken.current = axios.CancelToken.source();
    if (caller === 'Item') {
      if (clickRef.current) {
        return;
      }
      setBreadcrumbs(oldBreadcrumbs => [...oldBreadcrumbs, content]);
    } else if (caller === 'Breadcrumbs') {
      clickRef.current = false;
      setBreadcrumbs(oldBreadcrumbs =>
        _.slice(oldBreadcrumbs, 0, _.indexOf(oldBreadcrumbs, content) + 1),
      );
    }
    if (!_.isEmpty(content.folder) && !_.isEmpty(content.parentReference)) {
      dispatchListChildrenDriveItem(
        content.parentReference.driveId,
        content.id,
        undefined,
        cancelToken.current.token,
      );
    } else if (!_.isEmpty(content.siteCollection)) {
      dispatchDocumentLibraries(
        content.id,
        undefined,
        cancelToken.current.token,
      );
    } else if (content.driveType && !_.isEmpty(content.quota)) {
      dispatchListItemsDrive(content.id, undefined, cancelToken.current.token);
    }
    setContentId('');
    setSearch('');
  }, []);

  return (
    <Dialog open scroll="paper" fullWidth maxWidth="sm" disableEnforceFocus>
      <DialogTitle>
        Link Document Library
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
          <Grid item xs={12}>
            <Paper variant="outlined" square style={{ padding: 16 }}>
              <Breadcrumbs maxItems={4}>
                <Link
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSharePointSites();
                  }}
                >
                  All sites
                </Link>
                {_.map(breadcrumbs, breadcrumb => (
                  <Link
                    href="#"
                    onClick={e =>
                      handleContentClick(e, breadcrumb, 'Breadcrumbs')
                    }
                    key={breadcrumb.id}
                  >
                    {breadcrumb.displayName || breadcrumb.name}
                  </Link>
                ))}
              </Breadcrumbs>
            </Paper>
          </Grid>
          {placeholder && (
            <Grid item xs={12}>
              <TextField
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                size="small"
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  searchRef.current = true;
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <List>
              {_.map(
                _.filter(contents.value, content => _.isEmpty(content.file)),
                content => (
                  <React.Fragment key={content.id}>
                    <ListItem
                      button
                      onClick={e => handleContentClick(e, content, 'Item')}
                    >
                      <ListItemIcon
                        style={{
                          minWidth: _.isEmpty(content.siteCollection) ? 65 : 40,
                        }}
                      >
                        <Grid container alignItems="center">
                          {_.isEmpty(content.siteCollection) && (
                            <Radio
                              edge="start"
                              disableRipple
                              color="primary"
                              checked={content.id === contentId}
                              onClick={e => e.stopPropagation()}
                              onChange={() => setContentId(content.id)}
                            />
                          )}
                          <Folder />
                        </Grid>
                      </ListItemIcon>
                      <ListItemText
                        primary={content.displayName || content.name}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ),
              )}
              {contentsLoading && <LoadingSkeleton />}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleOk(contentId)}
          variant="outlined"
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LinkDocumentLibrary.propTypes = {
  dispatchSharePointSites: PropTypes.func,
  dispatchSearchSharePointSites: PropTypes.func,
  dispatchDocumentLibraries: PropTypes.func,
  dispatchListItemsDrive: PropTypes.func,
  dispatchListChildrenDriveItem: PropTypes.func,
  dispatchSearchDriveItems: PropTypes.func,
  dispatchSearchChildrenDriveItem: PropTypes.func,
  contents: PropTypes.object,
  contentsLoading: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOk: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contents: makeSelectContents(),
  contentsLoading: makeSelectContentsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchSharePointSites: (options, cancelToken) =>
      dispatch(sharePointSites(options, cancelToken)),
    dispatchSearchSharePointSites: (options, cancelToken) =>
      dispatch(searchSharePointSites(options, cancelToken)),
    dispatchDocumentLibraries: (siteId, options, cancelToken) =>
      dispatch(documentLibraries(siteId, options, cancelToken)),
    dispatchListItemsDrive: (driveId, options, cancelToken) =>
      dispatch(listItemsDrive(driveId, options, cancelToken)),
    dispatchListChildrenDriveItem: (driveId, itemId, options, cancelToken) =>
      dispatch(listChildrenDriveItem(driveId, itemId, options, cancelToken)),
    dispatchSearchDriveItems: (driveId, searchText, options, cancelToken) =>
      dispatch(searchDriveItems(driveId, searchText, options, cancelToken)),
    dispatchSearchChildrenDriveItem: (
      driveId,
      itemId,
      searchText,
      options,
      cancelToken,
    ) =>
      dispatch(
        searchChildrenDriveItem(
          driveId,
          itemId,
          searchText,
          options,
          cancelToken,
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LinkDocumentLibrary);
