/* eslint-disable indent */
/**
 *
 * AddSpeciality
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControlLabel,
  TextField,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Close, Image } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Dropzone from 'react-dropzone';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import {
  makeSelectUploadFile,
  makeSelectAddSpecialitySuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  uploadFile as uploadFileAction,
  resetAddSpeciality,
  addSpeciality,
  editSpeciality,
} from './actions';
import { AddSpecialitySchema } from './Schema';
// import messages from './messages';

const imageDimensions = {
  thumb: {
    title: '',
    crop: {
      unit: 'px',
      minWidth: 150,
      minHeight: 150,
      aspect: 150 / 150,
    },
    resize: { width: 150, height: 150 },
  },
};

export function AddSpeciality(props) {
  useInjectReducer({ key: 'addSpeciality', reducer });
  useInjectSaga({ key: 'addSpeciality', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    specialityType,
    specialityData,
    handleClose,
    uploadFile,
    dispatchUploadFile,
    dispatchResetAddSpeciality,
    dispatchAddSpeciality,
    dispatchEditSpeciality,
    addSpecialitySuccess,
  } = props;

  const [active, setActive] = useState(true);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState({});
  const [imageCropOpen, setImageCropOpen] = useState(false);
  const [content, setContent] = useState({
    description: '',
    link: '',
    numberOfYearsExperience: '',
    position: '',
    projectCode: '',
    location: '',
    type: specialityType,
  });

  useEffect(() => () => dispatchResetAddSpeciality(), []);

  useEffect(() => {
    if (addSpecialitySuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      handleClose();
    }
  }, [addSpecialitySuccess]);

  useEffect(() => {
    if (!_.isEmpty(specialityData)) {
      setActive(specialityData.active);
      setDateFrom(specialityData.dateFrom || null);
      setDateTo(specialityData.dateTo || null);
      setTitle(specialityData.title);
      setImage(specialityData.image);
      setContent({
        ...content,
        description: specialityData.description,
        link: specialityData.link,
        numberOfYearsExperience: specialityData.numberOfYearsExperience,
        position: specialityData.position,
        projectCode: specialityData.projectCode,
        location: specialityData.location,
      });
    }
  }, [specialityData]);

  const handleContentChange = e => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleOnDrop = useCallback(files => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(uploadFile)) {
      setImageCropOpen(true);
    }
  }, [uploadFile]);

  const handleImageCrop = cropImage => {
    setImage({
      ...cropImage,
      originalUrl: cropImage.urls[0],
      url: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleImageCropClose = () => {
    setImageCropOpen(false);
  };

  const handleSave = () => {
    const key = specialityType === 'Project' ? 'projects' : 'experiences';
    const payload = {
      active: specialityType === 'Project' ? active : undefined,
      content: {
        ...content,
        projectCode:
          specialityType === 'Project' ? content.projectCode : undefined,
        location:
          specialityType === 'Experience' ? content.location : undefined,
      },
      dateFrom: dateFrom ? parseFloat(moment(dateFrom).format('x')) : undefined,
      dateTo: dateTo ? parseFloat(moment(dateTo).format('x')) : undefined,
      title,
      imageUid: !_.isEmpty(image) ? image.uid : undefined,
      specialityType,
    };
    const result = AddSpecialitySchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      if (_.isEmpty(specialityData)) {
        dispatchAddSpeciality(key, payload);
      }
      if (!_.isEmpty(specialityData)) {
        dispatchEditSpeciality(key, { id: specialityData.id }, payload);
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          {specialityType}
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
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </Grid>
                {specialityType === 'Project' && (
                  <Grid item xs={12}>
                    <TextField
                      label="Project Code"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="projectCode"
                      value={content.projectCode}
                      onChange={handleContentChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Position"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="position"
                    value={content.position}
                    onChange={handleContentChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Experience"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="numberOfYearsExperience"
                    value={content.numberOfYearsExperience}
                    onChange={handleContentChange}
                    type="number"
                    helperText="Total experience in years"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Link"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="link"
                    value={content.link}
                    onChange={handleContentChange}
                  />
                </Grid>
                {specialityType === 'Experience' && (
                  <Grid item xs={12}>
                    <TextField
                      label="Location"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="location"
                      value={content.location}
                      onChange={handleContentChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    name="description"
                    value={content.description}
                    onChange={handleContentChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                {specialityType === 'Project' && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={active}
                          onChange={e => setActive(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="I am still on the project"
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardHeader title={<Typography>Choose Date</Typography>} />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            format="MMM dd, yyyy"
                            fullWidth
                            value={dateFrom}
                            onChange={date => setDateFrom(date)}
                            autoOk
                            maxDate={dateTo}
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
                        <Grid item xs={12}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            inputVariant="outlined"
                            fullWidth
                            format="MMM dd, yyyy"
                            value={dateTo}
                            onChange={date => setDateTo(date)}
                            autoOk
                            minDate={dateFrom}
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
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Thumbnail style={{ color: 'inherit' }}>
                    <Dropzone
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      maxFiles={1}
                      onDrop={handleOnDrop}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <BlockButton
                          style={
                            _.isEmpty(image)
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {_.isEmpty(image) ? (
                            <>
                              <Image fontSize="large" />
                              <Typography>Upload Image</Typography>
                            </>
                          ) : (
                            <img
                              src={image.url}
                              alt={image.title}
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </Thumbnail>
                </Grid>
                {!_.isEmpty(image) && (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => setImageCropOpen(true)}
                        >
                          Recrop Image
                        </Button>
                      </Grid>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={handleOnDrop}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Grid item xs={6} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Button
                              variant="outlined"
                              fullWidth
                              color="primary"
                            >
                              Update Image
                            </Button>
                          </Grid>
                        )}
                      </Dropzone>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {imageCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(uploadFile)
              ? _.head(uploadFile)
              : { ...image, url: image.originalUrl }
          }
          handleClose={handleImageCropClose}
          handleImageCrop={handleImageCrop}
          imageMap={imageDimensions}
        />
      )}
    </>
  );
}

AddSpeciality.propTypes = {
  open: PropTypes.bool,
  specialityType: PropTypes.string,
  specialityData: PropTypes.object,
  handleClose: PropTypes.func,
  uploadFile: PropTypes.array,
  dispatchUploadFile: PropTypes.func,
  dispatchResetAddSpeciality: PropTypes.func,
  dispatchAddSpeciality: PropTypes.func,
  dispatchEditSpeciality: PropTypes.func,
  addSpecialitySuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  uploadFile: makeSelectUploadFile(),
  addSpecialitySuccess: makeSelectAddSpecialitySuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: options => dispatch(uploadFileAction(options)),
    dispatchResetAddSpeciality: () => dispatch(resetAddSpeciality()),
    dispatchAddSpeciality: (key, options) =>
      dispatch(addSpeciality(key, options)),
    dispatchEditSpeciality: (key, params, options) =>
      dispatch(editSpeciality(key, params, options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddSpeciality);
