/**
 *
 * JobOffer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import DOMPurify from 'dompurify';
import LinesEllipsis from 'react-lines-ellipsis';

function JobOffer({ jobOffer, parseText, isFeedModal }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Typography variant="h6">{parseText}</Typography>
        {!isFeedModal ? (
          <LinesEllipsis text={jobOffer.content} maxLine={3} />
        ) : (
          <>
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobOffer.content),
              }}
            />
            <a
              href={jobOffer.path}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Apply for this job
            </a>
          </>
        )}
      </Grid>
    </Grid>
  );
}

JobOffer.propTypes = {
  jobOffer: PropTypes.object,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(JobOffer);
