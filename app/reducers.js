/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authBaseReducer from 'containers/AuthBase/reducer';
import footerReducer from 'containers/Footer/reducer';
import globalEntitiesReducer from 'containers/GlobalEntities/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    footer: footerReducer,
    authBase: authBaseReducer,
    globalEntities: globalEntitiesReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
