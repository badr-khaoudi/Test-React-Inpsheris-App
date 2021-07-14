/**
 *
 * LanguagePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { makeSelectLanguage } from '../AuthBase/selectors';

import { changeLocale } from '../LanguageProvider/actions';

function LanguagePage({ language, dispatch }) {
  const handleLocaleChange = e => {
    const { locale } = e.currentTarget.dataset;

    // Update the redux store
    dispatch(changeLocale(locale));
  };

  return (
    <>
      <Helmet>
        <title>Language</title>
        <meta name="description" content="Description of Language" />
      </Helmet>
      <Box m={2}>
        <Typography variant="h2" component="h2">
          Supported Languages
        </Typography>
      </Box>
      <Box mb={4}>
        <List>
          {language.map(lang => (
            <ListItem
              button
              key={lang.code}
              data-locale={lang.code}
              onClick={handleLocaleChange}
            >
              {lang.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

LanguagePage.propTypes = {
  language: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LanguagePage);
