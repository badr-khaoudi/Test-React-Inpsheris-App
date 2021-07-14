/**
 *
 * Tests for LivelyCommunityItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';

import LivelyCommunityItem from '../LivelyCommunityItem';

const store = configureStore({}, browserHistory);

const community = {
  id: 229,
  uid: 'cbed5a83-a773-40a1-b5f5-e2d50966bf64',
  label: 'Comptabilité',
  canEdit: true,
  communityType: 'Regular',
  group: {
    uid: 'dda2b2ef-4d8c-4494-845e-e1da4d685122',
  },
  thumbLogoUrl:
    '/api/mediamanager?file=attachments/3cad7bd8-fa25-448e-a317-1eb1c0f2fdd5/Screenshot+2019-05-14+at+21.34.18_128x96.png',
};

describe('<LivelyCommunityItem />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LivelyCommunityItem community={community} />
        </ConnectedRouter>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
