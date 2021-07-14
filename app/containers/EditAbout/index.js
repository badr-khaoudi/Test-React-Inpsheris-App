/**
 *
 * EditAbout
 *
 */

import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  FormControlLabel,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import Hashtag from 'containers/Hashtag/Loadable';
import {
  makeSelectCustomFieldList,
  makeSelectServiceFilterList,
  makeSelectHobbyList,
  makeSelectEmployeeList,
  makeSelectEditUserSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  customFieldList as customFieldListAction,
  serviceFilterList as serviceFilterListAction,
  hobbyList as hobbyListAction,
  employeeList as employeeListAction,
  editUser,
  resetEditAbout,
} from './actions';
// import messages from './messages';
import {
  MyProfileSchema,
  TextSchema,
  NumberSchema,
  DateSchema,
  LinkSchema,
} from './Schema';

export function EditAbout(props) {
  useInjectReducer({ key: 'editAbout', reducer });
  useInjectSaga({ key: 'editAbout', saga });

  const {
    userUid,
    open,
    handleClose,
    user,
    dispatchCustomFieldList,
    customFieldList,
    dispatchServiceFilterList,
    serviceFilterList,
    dispatchHobbyList,
    hobbyList,
    dispatchEmployeeList,
    employeeList,
    dispatchEditUser,
    dispatchResetEditAbout,
    editUserSuccess,
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [telephone, setTelephone] = useState('');
  const [town, setTown] = useState('');
  const [department, setDepartment] = useState('');
  const [service, setService] = useState('');
  const [positionName, setPositionName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showDateOfBirth, setShowDateOfBirth] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [hashTag, setHashTag] = useState([]);
  const [managerUID, setManagerUID] = useState({});
  const [speciality, setSpeciality] = useState('');

  useEffect(() => {
    dispatchCustomFieldList({ userUid });
    dispatchServiceFilterList({ field: 'service' });
    if (_.isEmpty(hobbyList)) {
      dispatchHobbyList({ viewBy: 'category' });
    }
    if (_.isEmpty(employeeList)) {
      dispatchEmployeeList({ userType: 'Employee' });
    }
    return () => dispatchResetEditAbout();
  }, []);

  useEffect(() => {
    if (editUserSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      handleClose();
    }
  }, [editUserSuccess]);

  useEffect(() => {
    setTelephone(user.telephone);
    setTown(user.town);
    setDepartment(user.department);
    setService(user.service);
    setPositionName(user.positionName);
    setDateOfBirth(user.dateOfBirth);
    setShowDateOfBirth(user.showDateOfBirth);
    setHashTag(user.hashTags || []);
    setSpeciality(user.speciality);
  }, [user]);

  const hobbyListOptions = useMemo(
    () => _.flatten(_.map(hobbyList.rows, row => row.items)),
    [hobbyList],
  );

  useEffect(() => {
    if (!_.isEmpty(hobbyList)) {
      setHobbies(
        _.compact(
          _.map(user.hobbyListing, hobby =>
            _.find(hobbyListOptions, {
              name: hobby,
            }),
          ),
        ),
      );
    }
  }, [hobbyListOptions]);

  useEffect(() => {
    if (!_.isEmpty(customFieldList)) {
      setCustomFields(
        _.compact(
          _.map(
            customFieldList,
            customField =>
              customField.displayOnProfile &&
              customField.updateable &&
              customField.name !== 'Manager UID' &&
              customField.name !== 'Skill' &&
              customField,
          ),
        ),
      );
    }
  }, [customFieldList]);

  useEffect(() => {
    if (!_.isEmpty(customFieldList) && !_.isEmpty(employeeList)) {
      const manager = _.find(customFieldList, { name: 'Manager UID' });
      if (!_.isEmpty(manager)) {
        setManagerUID({
          ...manager,
          updatedValue: _.find(employeeList, { uid: manager.updatedValue }),
        });
      }
    }
  }, [customFieldList, employeeList]);

  const handleCustomFields = (id, value) => {
    setCustomFields(
      _.map(customFields, customField =>
        customField.id === id
          ? { ...customField, updatedValue: value }
          : customField,
      ),
    );
  };

  const handleOkay = () => {
    const result = MyProfileSchema.validate({
      telephone,
      town,
      department,
      serviceFilterList,
      positionName,
      dateOfBirth,
      showDateOfBirth,
      hobbies,
      hashTag,
      speciality,
    });
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    let customFieldsResult;
    if (!result.error) {
      // eslint-disable-next-line consistent-return
      _.forEach(customFields, field => {
        if (field.type === 'Number') {
          customFieldsResult = NumberSchema.validate(field.updatedValue);
        } else if (field.type === 'Link') {
          customFieldsResult = LinkSchema.validate(field.updatedValue);
        } else if (field.type === 'Date') {
          customFieldsResult = DateSchema.validate(field.updatedValue);
        } else {
          customFieldsResult = TextSchema.validate(field.updatedValue);
        }
        if (customFieldsResult.error) {
          enqueueSnackbar(`${field.name}: ${customFieldsResult.error}`, {
            variant: 'error',
          });
          return false;
        }
      });
    }
    if (!customFieldsResult.error) {
      let payload = {
        uid: userUid,
        displayName: user.displayName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        spokenLanguage: user.spokenLanguage,
        zipCode: user.zipCode,
        telephone,
        town,
        department,
        service,
        positionName,
        dateOfBirth: parseFloat(moment(dateOfBirth).format('x')),
        showDateOfBirth,
        hobbies: _.map(hobbies, hobby => hobby.name).join('\n'),
        hashTag: hashTag.join(', '),
        speciality,
        customFields: _.map(
          customFields,
          ({ id: fieldId, name, updatedValue: value }) => ({
            fieldId,
            name,
            value: value || '',
          }),
        ),
      };
      if (!_.isEmpty(managerUID)) {
        payload = {
          ...payload,
          customFields: [
            ...payload.customFields,
            {
              fieldId: managerUID.id,
              name: managerUID.name,
              value: managerUID.updatedValue.uid,
            },
          ],
        };
      }
      dispatchEditUser(payload);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
        disableEnforceFocus
      >
        <DialogTitle>
          Edit My Profile
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers id="dialogContent">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Telephone"
                variant="outlined"
                fullWidth
                size="small"
                value={telephone}
                onChange={e => setTelephone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Town"
                variant="outlined"
                fullWidth
                size="small"
                value={town}
                onChange={e => setTown(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                size="small"
                value={department}
                onChange={e => setDepartment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                value={service}
                size="small"
                onChange={(event, newValue) => {
                  setService(newValue);
                }}
                options={serviceFilterList}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Service"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Position"
                variant="outlined"
                fullWidth
                size="small"
                value={positionName}
                onChange={e => setPositionName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd MMM"
                value={dateOfBirth || null}
                onChange={date => setDateOfBirth(date)}
                autoOk
                disableFuture
                fullWidth
                helperText="Only month and date info will be used"
                TextFieldComponent={textFieldProps => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...textFieldProps.InputProps,
                      style: { paddingRight: 0 },
                    }}
                    label="Date of Birth"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showDateOfBirth}
                    onChange={e => setShowDateOfBirth(e.target.checked)}
                    color="primary"
                  />
                }
                label="I accept that my profile will be highlighted on my birthday"
              />
            </Grid>
            {!_.isEmpty(managerUID) && (
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  value={managerUID.updatedValue}
                  size="small"
                  onChange={(event, newValue) => {
                    setManagerUID({
                      ...managerUID,
                      updatedValue: newValue,
                    });
                  }}
                  options={employeeList}
                  getOptionLabel={option => option.displayName}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="N+1"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            )}
            {_.map(
              customFields,
              customField =>
                customField.name !== 'Manager UID' && (
                  <Grid item xs={12} key={customField.id}>
                    {customField.type === 'Date' ? (
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="MMM dd, yyyy"
                        value={
                          _.find(customFields, customField).updatedValue || null
                        }
                        onChange={date =>
                          handleCustomFields(customField.id, date)
                        }
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
                            label={customField.name}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        select={customField.type === 'Dropdown'}
                        label={customField.name}
                        variant="outlined"
                        fullWidth
                        size="small"
                        type={_.lowerCase(customField.type)}
                        multiline={customField.type === 'Textarea'}
                        rows={customField.type === 'Textarea' ? 3 : undefined}
                        value={
                          _.find(customFields, customField).updatedValue || ''
                        }
                        onChange={e =>
                          handleCustomFields(customField.id, e.target.value)
                        }
                      >
                        {customField.type === 'Dropdown' &&
                          _.map(customField.dropdownValues, value => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  </Grid>
                ),
            )}
            <Grid item xs={12}>
              <TextField
                label="Skills"
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={3}
                value={speciality}
                onChange={e => setSpeciality(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  value={hobbies}
                  size="small"
                  multiple
                  disableCloseOnSelect
                  limitTags={5}
                  onChange={(event, newValue) => {
                    setHobbies(newValue);
                  }}
                  options={hobbyListOptions}
                  groupBy={option => option.category.name}
                  getOptionLabel={option => option.name}
                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox checked={selected} />
                      {option.name}
                    </>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Hobbies"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Hashtag hashtag={hashTag} setHashtag={setHashTag} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} variant="outlined" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditAbout.propTypes = {
  user: PropTypes.object,
  userUid: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  dispatchCustomFieldList: PropTypes.func,
  customFieldList: PropTypes.array,
  dispatchServiceFilterList: PropTypes.func,
  serviceFilterList: PropTypes.array,
  dispatchHobbyList: PropTypes.func,
  hobbyList: PropTypes.object,
  dispatchEmployeeList: PropTypes.func,
  employeeList: PropTypes.array,
  dispatchEditUser: PropTypes.func,
  dispatchResetEditAbout: PropTypes.func,
  editUserSuccess: PropTypes.bool,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    user: makeSelectUser(props.userUid),
    customFieldList: makeSelectCustomFieldList(),
    serviceFilterList: makeSelectServiceFilterList(),
    hobbyList: makeSelectHobbyList(),
    employeeList: makeSelectEmployeeList(),
    editUserSuccess: makeSelectEditUserSuccess(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchCustomFieldList: options =>
      dispatch(customFieldListAction(options)),
    dispatchServiceFilterList: options =>
      dispatch(serviceFilterListAction(options)),
    dispatchHobbyList: options => dispatch(hobbyListAction(options)),
    dispatchEmployeeList: options => dispatch(employeeListAction(options)),
    dispatchEditUser: options => dispatch(editUser(options)),
    dispatchResetEditAbout: () => dispatch(resetEditAbout()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditAbout);
