/**
 *
 * Tests for AllCommunitiesModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import AllCommunitiesModal from '../AllCommunitiesModal';

describe('AllCommunitiesModal', () => {
  it('Should return group name and community items', () => {
    const communityGroup = {
      groupName: 'Les services Itelis',
      uid: 'dda2b2ef-4d8c-4494-845e-e1da4d685122',
      sequenceNumber: 12,
    };
    const list = [
      {
        id: 229,
        uid: 'cbed5a83-a773-40a1-b5f5-e2d50966bf64',
        label: 'Comptabilité',
        canEdit: true,
        communityType: 'Regular',
        group: {
          uid: 'dda2b2ef-4d8c-4494-845e-e1da4d685122',
        },
      },
    ];
    const {
      container: { firstChild },
    } = render(<>{AllCommunitiesModal(communityGroup, list)}</>);
    expect(firstChild).toMatchSnapshot();
  });
});
