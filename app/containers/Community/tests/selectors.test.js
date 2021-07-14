import {
  selectCommunityDomain,
  makeSelectCommunityList,
  makeSelectCommunityGroupList,
  makeSelectCommunityListLoading,
  makeSelectCommunityGroupListLoading,
  makeSelectCommunityListError,
  makeSelectCommunityGroupListError,
} from '../selectors';

describe('selectCommunityDomain', () => {
  it('should select the community', () => {
    const community = {};
    const mockedState = {
      community,
    };
    expect(selectCommunityDomain(mockedState)).toEqual(community);
  });
});

describe('makeSelectCommunityList', () => {
  const communityListSelector = makeSelectCommunityList();
  it('should select the communityList', () => {
    const communityList = [
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
    const mockedState = {
      community: { communityList },
    };
    expect(communityListSelector(mockedState)).toEqual(communityList);
  });
});

describe('makeSelectCommunityGroupList', () => {
  const communityGroupListSelector = makeSelectCommunityGroupList();
  it('should select the communityGroupList', () => {
    const communityGroupList = [
      {
        groupName: 'Administrateurs',
        uid: 'c255e6cf-cff9-4892-8c92-e5d637a2548c',
        sequenceNumber: 6,
      },
    ];
    const mockedState = {
      community: { communityGroupList },
    };
    expect(communityGroupListSelector(mockedState)).toEqual(communityGroupList);
  });
});

describe('makeSelectCommunityListLoading', () => {
  const communityListLoadingSelector = makeSelectCommunityListLoading();
  it('should select the communityListLoading', () => {
    const communityListLoading = true;
    const mockedState = {
      community: { communityListLoading },
    };
    expect(communityListLoadingSelector(mockedState)).toEqual(
      communityListLoading,
    );
  });
});

describe('makeSelectCommunityGroupListLoading', () => {
  const communityGroupListLoadingSelector = makeSelectCommunityGroupListLoading();
  it('should select the communityGroupListLoading', () => {
    const communityGroupListLoading = true;
    const mockedState = {
      community: { communityGroupListLoading },
    };
    expect(communityGroupListLoadingSelector(mockedState)).toEqual(
      communityGroupListLoading,
    );
  });
});

describe('makeSelectCommunityListError', () => {
  const communityListErrorSelector = makeSelectCommunityListError();
  it('should select the communityListError', () => {
    const communityListError = true;
    const mockedState = {
      community: { communityListError },
    };
    expect(communityListErrorSelector(mockedState)).toEqual(communityListError);
  });
});

describe('makeSelectCommunityGroupListError', () => {
  const communityGroupListErrorSelector = makeSelectCommunityGroupListError();
  it('should select the communityGroupListError', () => {
    const communityGroupListError = true;
    const mockedState = {
      community: { communityGroupListError },
    };
    expect(communityGroupListErrorSelector(mockedState)).toEqual(
      communityGroupListError,
    );
  });
});
