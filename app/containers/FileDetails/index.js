/**
 *
 * FileDetails
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { Close, GetApp } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { makeSelectLanguage } from 'containers/AuthBase/selectors';
import Hashtag from 'containers/Hashtag/Loadable';
import { makeSelectFileDetails } from './selectors';
import { getFileDetails, editFileDetails } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function FileDetails(props) {
  useInjectReducer({ key: 'fileDetails', reducer });
  useInjectSaga({ key: 'fileDetails', saga });

  const {
    open,
    handleClose,
    fileUid,
    dispatchGetFileDetails,
    dispatchEditFileDetails,
    fileDetails,
    languages,
  } = props;

  useEffect(() => {
    dispatchGetFileDetails({ uid: fileUid });
  }, []);

  const handleSave = () => {
    dispatchEditFileDetails({
      ...details,
      hashTag: details.hashTag.join(', '),
    });
    handleClose();
  };

  const [details, setDetails] = useState({
    uid: '',
    title: '',
    description: '',
    version: '',
    language: '',
    audience: '',
    hashTag: [],
    status: '',
  });

  const statusOptions = [
    { status: 'Draft', value: 'Draft' },
    { status: 'Pending For Validation', value: 'Pending For Validation' },
    {
      status: 'Pending For Final Validation',
      value: 'Pending For Final Validation',
    },
    { status: 'Pending For Signature', value: 'Pending For Signature' },
    { status: 'Pending for translation', value: 'Pending for translation' },
    { status: 'Publication scheduled', value: 'Publication scheduled' },
    { status: 'Archived', value: 'Archived' },
    { status: 'publish', value: 'OnAir : Published' },
    { status: 'Published and Signed', value: 'Published and Signed' },
    {
      status: 'Publish, but changes required',
      value: 'Publish, but changes required',
    },
    {
      status: 'Published, but not searchable',
      value: 'Published, but not searchable',
    },
  ];

  useEffect(() => {
    if (!_.isEmpty(fileDetails)) {
      const fileDetail = _.head(fileDetails);
      setDetails({
        uid: fileDetail.uid || '',
        title: fileDetail.title || '',
        description: fileDetail.description || '',
        version: fileDetail.version || '',
        language: fileDetail.language || '',
        audience: fileDetail.audience || '',
        hashTag: fileDetail.hashTags || [],
        status: fileDetail.status || '',
      });
    }
  }, [fileDetails]);

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
      disableEnforceFocus
    >
      <DialogTitle>
        File Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {!_.isEmpty(fileDetails) && (
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Thumbnail thumbnail_url={_.head(fileDetails).thumbGalleryUrl} />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={details.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
                    name="description"
                    value={details.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      By
                    </Grid>
                    <Grid item xs={8}>
                      <Link
                        to={`/myprofile/${
                          _.head(fileDetails).author.uid
                        }/About`}
                      >
                        {_.head(fileDetails).author.displayName}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      File
                    </Grid>
                    <Grid item xs={8}>
                      {_.head(fileDetails).fileName}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      Version
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="version"
                        value={details.version}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      Language
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        name="language"
                        value={details.language}
                        onChange={handleChange}
                      >
                        {_.map(
                          languages,
                          language =>
                            language.active && (
                              <MenuItem
                                key={language.code}
                                value={language.name}
                              >
                                {language.name}
                              </MenuItem>
                            ),
                        )}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      Audience
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        name="audience"
                        value={details.audience}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Hashtag
                    hashtag={details.hashTag}
                    setHashtag={hashtag =>
                      setDetails({ ...details, hashTag: hashtag })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="outlined"
                color="primary"
                href={_.head(fileDetails).url}
                download
              >
                <GetApp />
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              select
              name="status"
              value={details.status}
              onChange={handleChange}
            >
              {_.map(statusOptions, option => (
                <MenuItem key={option.status} value={option.status}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button onClick={handleSave} variant="outlined" color="primary">
          Save
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FileDetails.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fileUid: PropTypes.string,
  dispatchGetFileDetails: PropTypes.func,
  dispatchEditFileDetails: PropTypes.func,
  fileDetails: PropTypes.array,
  languages: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  fileDetails: makeSelectFileDetails(),
  languages: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetFileDetails: options => dispatch(getFileDetails(options)),
    dispatchEditFileDetails: options => dispatch(editFileDetails(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FileDetails);
