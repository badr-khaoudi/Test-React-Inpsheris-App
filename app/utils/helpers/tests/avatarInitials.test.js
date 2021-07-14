/**
 * Test avatarInitials
 */

import { initials } from '../avatarInitials';

describe('initials', () => {
  it('should return first two letters', () => {
    expect(initials('Name')).toEqual('NA');
  });

  it('should return first letters of first two words', () => {
    expect(initials('First Last')).toEqual('FL');
  });
});
