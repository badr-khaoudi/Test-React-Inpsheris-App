/**
 *
 * LivelyMobileDocumentsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

function LivelyMobileDocumentsPage() {
  return (
    <>
      <Helmet>
        <title>LivelyMobileDocumentsPage</title>
        <meta
          name="description"
          content="Description of LivelyMobileDocumentsPage"
        />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </>
  );
}

LivelyMobileDocumentsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LivelyMobileDocumentsPage);
