/**
 *
 * UserAutocomplete
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { TextField, Avatar } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { makeSelectUserList, makeSelectUserListLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { userList as userListAction } from './actions';

export function UserAutocomplete(props) {
  useInjectReducer({ key: 'userAutocomplete', reducer });
  useInjectSaga({ key: 'userAutocomplete', saga });
  const dispatch = useDispatch();
  const { userUids, setUserUids } = props;

  const userList = useSelector(makeSelectUserList());
  const userListLoading = useSelector(makeSelectUserListLoading());

  const options = useMemo(
    () => _.filter(userList, user => !_.find(userUids, { uid: user.uid })),
    [userList],
  );

  return (
    <Autocomplete
      fullWidth
      multiple
      disableClearable
      disableCloseOnSelect
      freeSolo
      clearOnBlur
      limitTags={5}
      size="small"
      value={userUids}
      loading={userListLoading}
      onChange={(event, newValue) => setUserUids(newValue)}
      onInputChange={(event, searchText) => {
        if (searchText) {
          dispatch(
            userListAction({
              searchText,
              page: 1,
              itemsPerPage: 20,
              userType: 'Employee',
            }),
          );
        }
      }}
      options={options}
      getOptionLabel={({ displayName }) => displayName}
      renderOption={({ displayName, headerLogoUrl }, { selected }) => (
        <>
          <Checkbox checked={selected} />
          <Avatar src={headerLogoUrl} style={{ marginRight: 10 }}>
            {initials(displayName)}
          </Avatar>
          {displayName}
        </>
      )}
      renderTags={(tagValue, getTagProps) =>
        _.map(tagValue, ({ displayName, headerLogoUrl }, index) => (
          <Chip
            size="small"
            avatar={
              <Avatar src={headerLogoUrl}>{initials(displayName)}</Avatar>
            }
            label={displayName}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          placeholder="Rechercher des membres"
          variant="outlined"
          size="small"
        />
      )}
    />
  );
}

UserAutocomplete.propTypes = {
  userUids: PropTypes.array,
  setUserUids: PropTypes.func,
};

export default memo(UserAutocomplete);
