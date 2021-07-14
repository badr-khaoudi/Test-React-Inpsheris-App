import {
  getCommunityList,
  getCommunityListSuccess,
  getCommunityListError,
  getCommunityGroupList,
  getCommunityGroupListSuccess,
  getCommunityGroupListError,
  filterCommunityList,
} from '../actions';
import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_COMMUNITY_GROUP_LIST,
  GET_COMMUNITY_GROUP_LIST_SUCCESS,
  GET_COMMUNITY_GROUP_LIST_ERROR,
  FILTER_COMMUNITY_LIST,
} from '../constants';

describe('Community actions', () => {
  describe('getCommunityList', () => {
    it('should return the correct type', () => {
      const fixture = { orderBy: 'alphabet' };
      const expected = {
        type: GET_COMMUNITY_LIST,
        options: fixture,
      };
      expect(getCommunityList(fixture)).toEqual(expected);
    });
  });

  describe('getCommunityListSuccess', () => {
    it('should return the correct type and the community list', () => {
      const fixture = [
        {
          id: 248,
          uid: '42b6e8b4-3ecf-461b-965f-d6debf9c5f19',
          label: 'All Company',
          description: 'This is the default group for everyone in the network',
          canEdit: true,
          communityType: 'Yammer',
          group: {
            uid: '78a0c243-5a07-4cbf-9011-0e9312395f77',
          },
        },
      ];
      const expected = {
        type: GET_COMMUNITY_LIST_SUCCESS,
        data: fixture,
      };
      expect(getCommunityListSuccess(fixture)).toEqual(expected);
    });
  });

  describe('getCommunityListError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Error',
      };
      const expected = {
        type: GET_COMMUNITY_LIST_ERROR,
        error: fixture,
      };
      expect(getCommunityListError(fixture)).toEqual(expected);
    });
  });

  describe('getCommunityGroupList', () => {
    it('should return the correct type', () => {
      const expected = {
        type: GET_COMMUNITY_GROUP_LIST,
      };
      expect(getCommunityGroupList()).toEqual(expected);
    });
  });

  describe('getCommunityGroupListSuccess', () => {
    it('should return the correct type and the community group list', () => {
      const fixture = [
        {
          groupName: 'Administrateurs',
          uid: 'c255e6cf-cff9-4892-8c92-e5d637a2548c',
          sequenceNumber: 6,
        },
      ];
      const expected = {
        type: GET_COMMUNITY_GROUP_LIST_SUCCESS,
        data: fixture,
      };
      expect(getCommunityGroupListSuccess(fixture)).toEqual(expected);
    });
  });

  describe('getCommunityGroupListError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Error',
      };
      const expected = {
        type: GET_COMMUNITY_GROUP_LIST_ERROR,
        error: fixture,
      };
      expect(getCommunityGroupListError(fixture)).toEqual(expected);
    });
  });

  describe('filterCommunityList', () => {
    it('should return the correct type', () => {
      const fixture = { orderBy: 'alphabet', filter: 'all' };
      const expected = {
        type: FILTER_COMMUNITY_LIST,
        options: fixture,
      };
      expect(filterCommunityList(fixture)).toEqual(expected);
    });
  });
});
