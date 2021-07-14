/**
 *
 * Tests for YammerCommunityModalItem
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import YammerCommunityModalItem from '../YammerCommunityModalItem';

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

const renderComponent = (props = {}) =>
  render(<YammerCommunityModalItem {...props} />);

describe('<YammerCommunityModalItem />', () => {
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent({ community });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render and have community image', () => {
    const { getByTestId } = renderComponent({
      community: {
        ...community,
        yammerHeaderImageUrl:
          'https://mug0.assets-yammer.com/mugshot/images/48x48/group_profile.png',
      },
    });
    expect(getByTestId('yammerHeaderImageUrl')).not.toBeNull();
  });

  it('Should render and have community avatar', () => {
    const { getByTestId } = renderComponent({ community });
    expect(getByTestId('communityAvatar')).not.toBeNull();
  });
});
