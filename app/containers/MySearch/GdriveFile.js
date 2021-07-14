import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { DocumentIcons } from 'components/Icons';

const GdriveFile = ({ file }) => (
  <ListItem button>
    <ListItemAvatar>
      <DocumentIcons type={file.mimeType} fontSize="large" />
    </ListItemAvatar>
    <ListItemText
      primary={
        <a
          href={file.webViewLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {file.name}
        </a>
      }
      secondary={
        <>
          {/* <Typography variant="body1" component="span" display="block">
            Author
          </Typography> */}
          <Typography component="span">
            {`Document in `}
            <Link
              to={`/community/${encodeURIComponent(file.communityName)}/${
                file.communityUid
              }`}
            >
              {file.communityName}
            </Link>
          </Typography>
        </>
      }
    />
  </ListItem>
);

GdriveFile.propTypes = {
  file: PropTypes.object,
};

export default memo(GdriveFile);
