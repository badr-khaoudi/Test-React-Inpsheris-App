/**
 *
 * Tests for CommunityItems
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';

import CommunityItems from '../CommunityItems';

describe('CommunityItems', () => {
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
        thumbLogoUrl:
          '/api/mediamanager?file=attachments/3cad7bd8-fa25-448e-a317-1eb1c0f2fdd5/Screenshot+2019-05-14+at+21.34.18_128x96.png',
      },
    ];
    const {
      container: { firstChild },
    } = render(<>{CommunityItems(list)}</>);
    expect(firstChild).toMatchSnapshot();
  });
});
