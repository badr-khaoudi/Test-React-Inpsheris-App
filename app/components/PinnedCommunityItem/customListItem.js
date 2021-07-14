import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { CustomListItemContainer } from './wrapper';

function CustomListItem({ item, history, location }) {
  return (
    <>
      <CustomListItemContainer
        key={item.uid}
        onClick={() => {
          history.push({
            pathname: `/community/${encodeURIComponent(item.community.label)}/${
              item.community.uid
            }/${item.communityTab.uid}/${item.uid}/viewdetail/HP`,
            state: { background: location },
          });
        }}
        data-uid={item.uid}
      >
        <Typography variant="body2">{item.title}</Typography>
      </CustomListItemContainer>
    </>
  );
}

CustomListItem.propTypes = {
  item: PropTypes.object.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(CustomListItem);
