/**
 *
 * SettingsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

function SettingsPage() {
  return (
    <>
      <Helmet>
        <title>SettingsPage</title>
        <meta name="description" content="Description of SettingsPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </>
  );
}

SettingsPage.propTypes = {
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

export default compose(withConnect)(SettingsPage);
