import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { List, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { makeSelectSearch } from './selectors';

const ExternalResults = ({ type }) => {
  const search = useSelector(makeSelectSearch());
  return (
    <List>
      {_.map(search.externalResult[type], (result, index) => (
        <ListItem key={index} button>
          <a
            href={result.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ListItemText primary={result.title} secondary={result.url} />
          </a>
        </ListItem>
      ))}
    </List>
  );
};

ExternalResults.propTypes = {
  type: PropTypes.string,
};

export default memo(ExternalResults);
