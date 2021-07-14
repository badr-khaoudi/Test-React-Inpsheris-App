import produce from 'immer';
import communityReducer from '../reducer';
import {
  getCommunityList,
  getCommunityListSuccess,
  getCommunityListError,
  getCommunityGroupList,
  getCommunityGroupListSuccess,
  getCommunityGroupListError,
  filterCommunityList,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('communityReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      communityList: [],
      communityListLoading: false,
      communityListSuccess: false,
      communityListError: '',
      communityGroupList: [],
      communityGroupListLoading: false,
      communityGroupListSuccess: false,
      communityGroupListError: '',
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(communityReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getCommunityList action correctly', () => {
    const fixture = { orderBy: 'alphabet' };
    const expectedResult = produce(state, draft => {
      draft.communityList = [];
      draft.communityListLoading = true;
      draft.communityListSuccess = false;
      draft.communityListError = '';
    });

    expect(communityReducer(state, getCommunityList(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getCommunityListSuccess action correctly', () => {
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
    const expectedResult = produce(state, draft => {
      draft.communityList = fixture;
      draft.communityListLoading = false;
      draft.communityListSuccess = true;
      draft.communityListError = '';
    });

    expect(communityReducer(state, getCommunityListSuccess(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getCommunityListError action correctly', () => {
    const fixture = {
      msg: 'Error',
    };
    const expectedResult = produce(state, draft => {
      draft.communityListLoading = false;
      draft.communityListSuccess = false;
      draft.communityListError = fixture;
    });

    expect(communityReducer(state, getCommunityListError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getCommunityGroupList action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.communityGroupList = [];
      draft.communityGroupListLoading = true;
      draft.communityGroupListSuccess = false;
      draft.communityGroupListError = '';
    });

    expect(communityReducer(state, getCommunityGroupList())).toEqual(
      expectedResult,
    );
  });

  it('should handle the getCommunityGroupListSuccess action correctly', () => {
    const fixture = [
      {
        groupName: 'Administrateurs',
        uid: 'c255e6cf-cff9-4892-8c92-e5d637a2548c',
        sequenceNumber: 6,
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.communityGroupList = fixture;
      draft.communityGroupListLoading = false;
      draft.communityGroupListSuccess = true;
      draft.communityGroupListError = '';
    });

    expect(
      communityReducer(state, getCommunityGroupListSuccess(fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the getCommunityGroupListError action correctly', () => {
    const fixture = {
      msg: 'Error',
    };
    const expectedResult = produce(state, draft => {
      draft.communityGroupListLoading = false;
      draft.communityGroupListSuccess = false;
      draft.communityGroupListError = fixture;
    });

    expect(
      communityReducer(state, getCommunityGroupListError(fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the filterCommunityList action correctly', () => {
    const fixture = { orderBy: 'alphabet', filter: 'all' };
    const expectedResult = produce(state, draft => {
      draft.communityList = [];
      draft.communityListLoading = true;
      draft.communityListSuccess = false;
      draft.communityListError = '';
    });

    expect(communityReducer(state, filterCommunityList(fixture))).toEqual(
      expectedResult,
    );
  });
});
