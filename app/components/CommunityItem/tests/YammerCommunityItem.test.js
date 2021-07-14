/**
 *
 * Tests for YammerCommunityItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import YammerCommunityItem from '../YammerCommunityItem';

const community = {
  id: 248,
  uid: '42b6e8b4-3ecf-461b-965f-d6debf9c5f19',
  label: 'All Company',
  description: 'This is the default group for everyone in the network',
  canEdit: true,
  communityType: 'Yammer',
  group: {
    uid: '78a0c243-5a07-4cbf-9011-0e9312395f77',
  },
};

describe('<YammerCommunityItem />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<YammerCommunityItem community={community} />);
    expect(firstChild).toMatchSnapshot();
  });
});
