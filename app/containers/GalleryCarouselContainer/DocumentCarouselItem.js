/* eslint-disable react/no-multi-comp */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import { Document, Page, pdfjs } from 'react-pdf/dist/entry.webpack';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import GetApp from '@material-ui/icons/GetApp';
import { DocumentContainer, ControllerGrid, PageNumberInput } from './wrapper';

import { ReactComponent as PlusIcon } from '../../images/svg/plus-flat.svg';
import { ReactComponent as MinusIcon } from '../../images/svg/minus.svg';

const useStyles = makeStyles(() => ({
  svg: {
    height: 15,
    width: 15,
  },
}));

const DocumentError = memo(({ media }) => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Alert severity="error">
        <AlertTitle>No preview available</AlertTitle>
        {media && (
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<GetApp />}
            href={media.url}
            download
          >
            Download
          </Button>
        )}
      </Alert>
    </Box>
  );
});

DocumentError.propTypes = {
  media: PropTypes.object,
};

const Loading = memo(() => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    height="100%"
  >
    <CircularProgress />
    <Typography>Please wait!</Typography>
  </Box>
));

export default function DocumentCarouselItem({ media }) {
  const classes = useStyles();
  const [numOfPages, setNumOfPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);

  const minZoom = 0.5;
  const maxZoom = 2;
  const zoomStep = 0.25;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumOfPages(numPages);
    setPageNumber(1);
  };

  const changePage = pageNum => {
    setPageNumber(pageNum);
  };

  const previousPage = () => {
    changePage(pageNumber - 1);
  };

  const nextPage = () => {
    changePage(pageNumber + 1);
  };

  const zoomIn = () => {
    setZoom(zoom + zoomStep);
  };

  const zoomOut = () => {
    setZoom(zoom - zoomStep);
  };

  return (
    <DocumentContainer>
      <Document
        className="lively-document"
        onLoadSuccess={onDocumentLoadSuccess}
        file={media.pdfUrl}
        noData={<DocumentError media={media} />}
        loading={<Loading />}
        error={<DocumentError media={media} />}
        options={{
          cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
      >
        <Page
          scale={zoom}
          className="lively-document-page custom-scrollbar"
          style={{ display: 'flex', justifyContent: 'center' }}
          pageNumber={pageNumber}
        />
      </Document>
      {!numOfPages && <CircularProgress />}
      {numOfPages && (
        <ControllerGrid container style={{ background: 'white' }}>
          <Grid item sm={4} className="grid-item">
            <Button
              color="primary"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              fullWidth
            >
              Previous Page
            </Button>
          </Grid>
          <Grid item sm={4} className="grid-item">
            <Button
              color="primary"
              disabled={zoom <= minZoom}
              onClick={zoomOut}
              size="large"
            >
              <MinusIcon className={classes.svg} />
            </Button>
            <Box display="flex" flexDirection="row" ml={2} mr={2}>
              <Typography>Page </Typography>
              <PageNumberInput
                type="number"
                onChange={e => changePage(parseInt(e.target.value, 10))}
                value={pageNumber || (numOfPages ? 1 : '--')}
              />
              <Typography> of {numOfPages || '--'}</Typography>
            </Box>
            <Button
              size="large"
              color="primary"
              disabled={zoom >= maxZoom}
              onClick={zoomIn}
            >
              <PlusIcon className={classes.svg} />
            </Button>
          </Grid>
          <Grid item sm={4} className="grid-item">
            <Button
              color="primary"
              disabled={pageNumber >= numOfPages}
              onClick={nextPage}
              fullWidth
            >
              Next Page
            </Button>
          </Grid>
        </ControllerGrid>
      )}
    </DocumentContainer>
  );
}

DocumentCarouselItem.propTypes = {
  media: PropTypes.object,
};
