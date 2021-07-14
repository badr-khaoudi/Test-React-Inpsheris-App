import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TreeView from '@material-ui/lab/TreeView';
import { Add, Remove } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import FileTreeItem from 'components/FileTreeItem';
import {
  makeSelectCommunityFiles,
  makeSelectCommunityFilesLoading,
} from './selectors';

const renderTree = nodes =>
  _.map(nodes, node => (
    <FileTreeItem
      key={node.fileUid}
      nodeId={node.fileUid}
      fileUid={node.fileUid}
      author={node.author}
      fileModifiedDate={node.fileModifiedDate}
      fileName={node.fileName}
      fileType={node.fileType}
      isExternalFile={node.isExternalFile}
      isGdrive={node.isGdrive}
    >
      {node.fileType === 'folder' && Array.isArray(node.files)
        ? renderTree(node.files, node.fileUid)
        : null}
    </FileTreeItem>
  ));

const Files = ({ page, setPage }) => {
  const communityFiles = useSelector(makeSelectCommunityFiles());
  const communityFilesLoading = useSelector(makeSelectCommunityFilesLoading());
  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: 10,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1, paddingRight: 10 }}>
          <Typography variant="h6" style={{ fontSize: '1rem' }}>
            Name
          </Typography>
        </div>
        <div style={{ width: '20%', paddingLeft: 10, paddingRight: 10 }}>
          <Typography variant="h6" style={{ fontSize: '1rem' }}>
            Uploaded by
          </Typography>
        </div>
        <div style={{ width: '10%', paddingRight: 10 }}>
          <Typography variant="h6" style={{ fontSize: '1rem' }}>
            Source
          </Typography>
        </div>
        <div style={{ width: '150px' }}>
          <Typography variant="h6" style={{ fontSize: '1rem' }}>
            Date
          </Typography>
        </div>
      </div>
      <TreeView defaultCollapseIcon={<Remove />} defaultExpandIcon={<Add />}>
        {renderTree(communityFiles.rows)}
      </TreeView>
      {communityFilesLoading &&
        _.map(_.range(4), index => (
          <Skeleton
            key={index}
            variant="rect"
            height={45}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        ))}
      {page * 10 === _.size(communityFiles.rows) && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={() => setPage(page + 1)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Files.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default memo(Files);
