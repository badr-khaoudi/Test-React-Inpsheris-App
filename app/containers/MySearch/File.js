import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { DocumentIcons } from 'components/Icons';

const File = ({ file }) => (
  <ListItem button>
    <ListItemAvatar>
      <DocumentIcons type={file.fileType} fontSize="large" />
    </ListItemAvatar>
    <ListItemText
      primary={file.fileTitle}
      secondary={
        <>
          <Typography variant="body1" component="span" display="block">
            {file.author && (
              <Link
                onClick={e => e.stopPropagation()}
                to={`/myprofile/${file.author.uid}/About`}
              >
                {`${file.author.firstName} ${file.author.lastName}`}
              </Link>
            )}
          </Typography>
          {file.community && (
            <Typography component="span">
              {`Document in `}
              <Link
                onClick={e => e.stopPropagation()}
                to={`/community/${encodeURIComponent(file.community.label)}/${
                  file.community.uid
                }`}
              >
                {file.community.label}
              </Link>
            </Typography>
          )}
          {!file.community && file.communities && (
            <Typography component="span">
              {`Document in `}
              <Link
                onClick={e => e.stopPropagation()}
                to={`/community/${encodeURIComponent(
                  file.communities[0].label,
                )}/${file.communities[0].uid}`}
              >
                {file.communities[0].label}
              </Link>
            </Typography>
          )}
        </>
      }
    />
  </ListItem>
);

File.propTypes = {
  file: PropTypes.object,
};

export default memo(File);
