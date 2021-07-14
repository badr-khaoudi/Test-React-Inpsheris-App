import axios from 'axios';
import { msalInstance } from 'utils/msalInstance';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const MicrosoftGraphApi = async scopes => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error('No active account!');
  }
  let token;
  try {
    token = await msalInstance.acquireTokenSilent({
      scopes: ['User.Read', ...scopes],
      account,
    });
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      token = await msalInstance.acquireTokenPopup({
        scopes: ['User.Read', ...scopes],
        account,
      });
    }
  }
  return axios.create({
    baseURL: 'https://graph.microsoft.com/',
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });
};

export default MicrosoftGraphApi;
