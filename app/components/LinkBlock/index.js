/**
 *
 * LinkBlock
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import { AddCircleOutline, Delete, Close } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { checkFavicon } from 'utils/helpers/checkFavicon';
import {
  UploadGrid,
  Actions,
  ActionButton,
} from 'containers/QuickPost/Wrapper';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import VideoUrl from 'containers/VideoUrl/Loadable';

function LinkBlock(props) {
  const { links, setLinks, handleClose } = props;
  const [linkUrlOpen, setLinkUrlOpen] = useState(false);
  const confirm = useConfirm();

  const handleLinkUrlSelect = async link => {
    let tempLink = {
      id: uuidv4(),
      location: link.url,
      description: link.description,
      title: link.title,
      thumbnail_width: link.thumbnail_width,
      path: link.url,
      thumbnail_url: link.thumbnail_url,
      version: link.version,
      subTitle: link.provider_name,
      type: link.type,
      thumbnail_height: link.thumbnail_height,
      favicon: link.favicon,
    };
    if (link.favicon === undefined) {
      const favicon = await checkFavicon(`${link.provider_url}/favicon.ico`);
      if (favicon.status === 'Ok') {
        tempLink = { ...tempLink, favicon: favicon.path };
      }
    }
    setLinkUrlOpen(false);
    setLinks([...links, tempLink]);
  };

  const handleDelete = async id => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this?',
      });
      setLinks(_.filter(links, link => link.id !== id));
    } catch {
      return false;
    }
    return false;
  };

  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>*</Grid>
        <Grid item xs zeroMinWidth>
          <Paper
            elevation={0}
            style={{
              backgroundColor: '#eceeef',
              padding: 10,
              paddingRight: 44,
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Close fontSize="small" />
            </IconButton>
            <Grid container spacing={2}>
              {links &&
                _.map(links, link => (
                  <Grid item xs={3} key={link.id}>
                    <Thumbnail thumbnail_url={link.thumbnail_url}>
                      <Actions>
                        <ActionButton onClick={() => handleDelete(link.id)}>
                          <Delete />
                        </ActionButton>
                      </Actions>
                    </Thumbnail>
                  </Grid>
                ))}
              <Grid item xs={3}>
                <UploadGrid>
                  <ButtonBase
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onClick={() => setLinkUrlOpen(true)}
                  >
                    <Grid container direction="column" alignItems="center">
                      <AddCircleOutline />
                      Url
                    </Grid>
                  </ButtonBase>
                </UploadGrid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {linkUrlOpen && (
        <VideoUrl
          type="link"
          open={linkUrlOpen}
          onClose={() => {
            setLinkUrlOpen(false);
          }}
          handleVideoUrlSelect={handleLinkUrlSelect}
        />
      )}
    </>
  );
}

LinkBlock.propTypes = {
  links: PropTypes.array,
  setLinks: PropTypes.func,
  handleClose: PropTypes.func,
};

export default memo(LinkBlock);
