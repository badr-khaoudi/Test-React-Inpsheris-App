/**
 *
 * SelectCommunity
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import styled from 'styled-components';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormGroup,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { Close } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function SelectCommunity(props) {
  const {
    communitySelectOpen,
    handleClose,
    communityListLoading,
    communityList,
    selectedCommunities,
    handleSelectedCommunities,
    handleFilterCommunities,
    handleSelectCommunityChange,
  } = props;

  const [searchCommunity, setSearchCommunity] = useState('');

  const handleSearchCommunity = e => {
    setSearchCommunity(e.target.value);
    handleFilterCommunities(e.target.value);
  };

  return (
    <Dialog
      open={communitySelectOpen}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Select Community
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container style={{ marginBottom: 10 }}>
          <TextField
            label="Search Community"
            variant="outlined"
            fullWidth
            size="small"
            value={searchCommunity}
            onChange={handleSearchCommunity}
          />
        </Grid>
        {communityListLoading && (
          <Grid container spacing={1}>
            {_.map(_.range(4), index => (
              <Grid item xs={12} key={index}>
                <Skeleton variant="rect" height={30} />
              </Grid>
            ))}
          </Grid>
        )}
        {!communityListLoading && communityList && (
          <FormGroup>
            {_.map(communityList, community => (
              <FormControlLabel
                key={community.uid}
                control={
                  <Checkbox
                    checked={_.indexOf(selectedCommunities, community.uid) > -1}
                    onChange={handleSelectedCommunities}
                    value={community.uid}
                    color="primary"
                  />
                }
                label={community.label}
              />
            ))}
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSelectCommunityChange}
          variant="outlined"
          color="primary"
          disabled={communityListLoading}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SelectCommunity.propTypes = {
  communitySelectOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  selectedCommunities: PropTypes.array,
  handleSelectedCommunities: PropTypes.func,
  handleFilterCommunities: PropTypes.func,
  handleSelectCommunityChange: PropTypes.func,
};

export default memo(SelectCommunity);
