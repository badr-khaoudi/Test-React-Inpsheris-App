import { PublicClientApplication } from '@azure/msal-browser';

export const msalInstance = new PublicClientApplication({
  auth: {
    // authority: `https://login.microsoftonline.com/${
    //   externalSource[0].clientId
    // }/`,
    // clientId: externalSource[0].clientId,
    // redirectUri: 'http://localhost:3000/auth.html',
    clientId: 'c76d377a-91e0-40d9-8f27-131e4df1e700',
    redirectUri: 'http://localhost:3000/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
});
