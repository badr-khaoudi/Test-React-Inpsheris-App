/**
 *
 * Tests for CommunityModalItems
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import CommunityModalItems from '../CommunityModalItems';

describe('CommunityModalItems', () => {
  it('Should return community items', () => {
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
    } = render(<>{CommunityModalItems(list)}</>);
    expect(firstChild).toMatchSnapshot();
  });
});
