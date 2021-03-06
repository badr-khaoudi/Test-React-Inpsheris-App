/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import { shouldPolyfill } from '@formatjs/intl-locale/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill';
import { shouldPolyfill as shouldPolyfillRelativeTimeFormat } from '@formatjs/intl-relativetimeformat/should-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

async function polyfillPluralRules() {
  if (!shouldPolyfillPluralRules()) {
    return;
  }
  await import('@formatjs/intl-pluralrules/polyfill');
  await import('@formatjs/intl-pluralrules/locale-data/fr');
  await import('@formatjs/intl-pluralrules/locale-data/en');
}

async function polyfillRelativeTimeFormat() {
  if (!shouldPolyfillRelativeTimeFormat()) {
    return;
  }
  await import('@formatjs/intl-relativetimeformat/polyfill');
  await import('@formatjs/intl-relativetimeformat/locale-data/fr');
  await import('@formatjs/intl-relativetimeformat/locale-data/en');
}

(async () => {
  if (shouldPolyfill()) {
    await import('@formatjs/intl-locale/polyfill');
    await polyfillPluralRules();
    await polyfillRelativeTimeFormat();
    render(translationMessages);
  } else {
    render(translationMessages);
  }
})();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
