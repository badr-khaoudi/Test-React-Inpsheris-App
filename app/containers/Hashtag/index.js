/**
 *
 * Hashtag
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { TextField } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectHashtagListing,
  makeSelectHashtagListingLoading,
} from './selectors';
import { getHashtagListing } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const filter = createFilterOptions();

export function Hashtag(props) {
  useInjectReducer({ key: 'hashtag', reducer });
  useInjectSaga({ key: 'hashtag', saga });

  const {
    dispatchHashtagListing,
    hashtagListing,
    hashtagListingLoading,
    hashtag,
    setHashtag,
  } = props;

  const intl = useIntl();

  return (
    <Autocomplete
      fullWidth
      multiple
      selectOnFocus
      disableClearable
      freeSolo
      includeInputInList
      filterSelectedOptions
      limitTags={5}
      size="small"
      loading={hashtagListingLoading}
      value={hashtag}
      onChange={(event, newValue) =>
        setHashtag(
          _.filter(
            _.map(newValue, value =>
              value.inputValue ? value.inputValue : value,
            ),
            value => /^#\w+$/.test(value),
          ),
        )
      }
      onInputChange={(event, newInputValue) => {
        if (newInputValue) {
          dispatchHashtagListing({
            query: _.trim(newInputValue, '#'),
          });
        }
      }}
      options={_.uniq([
        ..._.map(hashtagListing, hashtagItem => hashtagItem.tagName),
        ...hashtag,
      ])}
      getOptionLabel={option => {
        if (option.title) {
          return option.title;
        }
        return option;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '' && /^#\w+$/.test(params.inputValue)) {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={intl.formatMessage(messages.addHashtag)}
          variant="outlined"
        />
      )}
    />
  );
}

Hashtag.propTypes = {
  dispatchHashtagListing: PropTypes.func,
  hashtagListing: PropTypes.array,
  hashtagListingLoading: PropTypes.bool,
  intl: PropTypes.object,
  hashtag: PropTypes.array,
  setHashtag: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hashtagListing: makeSelectHashtagListing(),
  hashtagListingLoading: makeSelectHashtagListingLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchHashtagListing: options => dispatch(getHashtagListing(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Hashtag);
