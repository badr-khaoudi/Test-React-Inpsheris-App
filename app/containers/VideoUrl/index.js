/**
 *
 * VideoUrl
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import ReactPlayer from 'react-player';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { LinkEmbed } from 'components/FeedTypes';
import {
  makeSelectEmbedUrl,
  makeSelectOEmbed,
  makeSelectOEmbedError,
} from './selectors';
import { getEmbedUrl, getOEmbed, cleanOEmbed } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function VideoUrl(props) {
  useInjectReducer({ key: 'videoUrl', reducer });
  useInjectSaga({ key: 'videoUrl', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    type,
    open,
    onClose,
    handleVideoUrlSelect,
    dispatchGetEmbedUrl,
    dispatchGetOEmbed,
    dispatchCleanOEmbed,
    embedUrl,
    oEmbed,
    oEmbedError,
  } = props;

  useEffect(() => {
    dispatchGetEmbedUrl({ name: 'EMBED_URL' });
    return () => dispatchCleanOEmbed();
  }, []);

  const [url, setUrl] = useState('');

  const handleUrlChange = e => {
    setUrl(e.target.value);
    dispatchGetOEmbed({ url: e.target.value, key: embedUrl.key });
  };

  useEffect(() => {
    if (type === 'video' && oEmbed.type && oEmbed.type !== type) {
      enqueueSnackbar(`Invalid ${type}`, {
        variant: 'error',
      });
    }
  }, [oEmbed]);

  useEffect(() => {
    if (oEmbedError)
      enqueueSnackbar(oEmbedError, {
        variant: 'error',
      });
  }, [oEmbedError]);

  const oEmbedData = { url: oEmbed.url ? oEmbed.url : url, ...oEmbed };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {type === 'video' ? 'Video URL' : 'URL'}
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              value={url}
              onChange={e => handleUrlChange(e)}
              placeholder="URL"
            />
          </Grid>
          <Grid item>
            {type === 'video' && oEmbedData.type === 'video' && (
              <ReactPlayer
                style={{ background: '#000000' }}
                url={oEmbedData.url}
                height={oEmbedData.height}
                width={oEmbedData.width}
              />
            )}
            {type === 'link' && oEmbedData.type && (
              <LinkEmbed
                links={[
                  {
                    path: oEmbedData.url,
                    thumbnail_url: oEmbedData.thumbnail_url,
                    title: oEmbedData.title,
                    description: oEmbedData.description,
                  },
                ]}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleVideoUrlSelect(oEmbedData);
          }}
          variant="outlined"
          color="primary"
          disabled={!oEmbedData.type}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

VideoUrl.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleVideoUrlSelect: PropTypes.func,
  dispatchGetEmbedUrl: PropTypes.func,
  dispatchGetOEmbed: PropTypes.func,
  dispatchCleanOEmbed: PropTypes.func,
  embedUrl: PropTypes.object,
  oEmbed: PropTypes.object,
  oEmbedError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  embedUrl: makeSelectEmbedUrl(),
  oEmbed: makeSelectOEmbed(),
  oEmbedError: makeSelectOEmbedError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetEmbedUrl: options => dispatch(getEmbedUrl(options)),
    dispatchGetOEmbed: options => dispatch(getOEmbed(options)),
    dispatchCleanOEmbed: options => dispatch(cleanOEmbed(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoUrl);
