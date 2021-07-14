/**
 *
 * LivelyForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { createPopup } from '@typeform/embed';
import '@typeform/embed/build/css/popup.css';

function LivelyForm({ link }) {
  const { toggle } = createPopup(link.formid);
  return (
    <Button onClick={toggle} variant="outlined" color="primary">
      Open Popup
    </Button>
  );
}

LivelyForm.propTypes = {
  link: PropTypes.object,
};

export default memo(LivelyForm);
