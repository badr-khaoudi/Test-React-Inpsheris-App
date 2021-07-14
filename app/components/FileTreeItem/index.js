/**
 *
 * FileTreeItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import { DocumentIcons, Folder } from 'components/Icons';

const useTreeItemStyles = makeStyles(() => ({
  content: { position: 'relative' },
  iconContainer: { position: 'absolute', right: 10 },
}));

function FileTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    fileUid,
    author,
    fileModifiedDate,
    fileName,
    fileType,
    isExternalFile,
    isGdrive,
    handleChange,
    checked,
    ...rest
  } = props;

  if (fileType === 'folder')
    return (
      <TreeItem
        label={
          <div
            style={{
              display: 'flex',
              padding: 10,
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              alignItems: 'center',
            }}
          >
            {handleChange && (
              <Checkbox
                checked={checked}
                onClick={e => e.stopPropagation()}
                onChange={e =>
                  handleChange(e.target.checked, 'folder', fileUid)
                }
              />
            )}
            <div
              style={{
                display: 'flex',
                flex: 1,
                paddingRight: 10,
                alignItems: 'center',
              }}
            >
              <Folder />
              <Typography
                style={{ wordBreak: 'break-all', marginLeft: 10 }}
                display="inline"
              >
                {fileName}
              </Typography>
            </div>
            <div style={{ width: '150px' }}>
              <Typography>
                {moment(fileModifiedDate).format('DD MMM YYYY')}
              </Typography>
            </div>
          </div>
        }
        classes={{
          content: classes.content,
          iconContainer: classes.iconContainer,
        }}
        {...rest}
      />
    );

  return (
    <TreeItem
      label={
        <div
          style={{
            display: 'flex',
            padding: 10,
            borderBottom: '1px dashed rgba(0, 0, 0, 0.12)',
            alignItems: 'center',
          }}
        >
          {handleChange && (
            <Checkbox
              checked={checked}
              onChange={e => handleChange(e.target.checked, 'file', fileUid)}
            />
          )}
          <div
            style={{
              display: 'flex',
              flex: 1,
              paddingRight: 10,
              alignItems: 'center',
            }}
          >
            <DocumentIcons type={fileType} />
            <Typography style={{ wordBreak: 'break-all', marginLeft: 10 }}>
              {fileName}
            </Typography>
          </div>
          <div style={{ width: '20%', paddingRight: 10 }}>
            <Typography>
              {author && `${author.firstName} ${author.lastName}`}
            </Typography>
          </div>
          <div style={{ width: '10%', paddingRight: 10 }}>
            <Typography>
              {isExternalFile && isGdrive ? 'GDrive' : 'Local'}
            </Typography>
          </div>
          <div style={{ width: '150px' }}>
            <Typography>
              {moment(fileModifiedDate).format('DD MMM YYYY')}
            </Typography>
          </div>
        </div>
      }
      {...rest}
    />
  );
}

FileTreeItem.propTypes = {
  fileUid: PropTypes.string,
  author: PropTypes.object,
  fileModifiedDate: PropTypes.string,
  fileName: PropTypes.string,
  fileType: PropTypes.string,
  isExternalFile: PropTypes.bool,
  isGdrive: PropTypes.bool,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default memo(FileTreeItem);
