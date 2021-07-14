/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put, debounce } from 'redux-saga/effects';
import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_GROUP_LIST,
  FILTER_COMMUNITY_LIST,
} from '../constants';
import {
  getCommunityListSuccess,
  getCommunityListError,
  getCommunityGroupListSuccess,
  getCommunityGroupListError,
} from '../actions';
import communitySaga, {
  getCommunityList,
  getCommunityGroupList,
  filterCommunityList,
} from '../saga';

describe('getCommunityList Saga', () => {
  let getCommunityListGenerator;
  const options = { orderBy: 'alphabet' };
  beforeEach(() => {
    getCommunityListGenerator = getCommunityList(options);

    const callDescriptor = getCommunityListGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getCommunityListSuccess action if it requests the data successfully', () => {
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
    const response = {
      data: communityList,
    };
    const putDescriptor = getCommunityListGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getCommunityListSuccess(communityList)));
  });

  it('should dispatch getCommunityListError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = getCommunityListGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getCommunityListError('Error')));
  });
});

describe('getCommunityGroupList Saga', () => {
  let getCommunityGroupListGenerator;
  const options = { orderBy: 'alphabet', filter: 'all' };
  beforeEach(() => {
    getCommunityGroupListGenerator = getCommunityGroupList(options);

    const callDescriptor = getCommunityGroupListGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getCommunityGroupListSuccess action if it requests the data successfully', () => {
    const communityGroupList = [
      {
        groupName: 'Administrateurs',
        uid: 'c255e6cf-cff9-4892-8c92-e5d637a2548c',
        sequenceNumber: 6,
      },
    ];
    const response = {
      data: communityGroupList,
    };
    const putDescriptor = getCommunityGroupListGenerator.next(response).value;
    expect(putDescriptor).toEqual(
      put(getCommunityGroupListSuccess(communityGroupList)),
    );
  });

  it('should dispatch getCommunityGroupListError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = getCommunityGroupListGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getCommunityGroupListError('Error')));
  });
});

describe('filterCommunityList Saga', () => {
  let filterCommunityListGenerator;
  const options = { orderBy: 'alphabet', filter: 'all' };
  beforeEach(() => {
    filterCommunityListGenerator = filterCommunityList(options);

    const callDescriptor = filterCommunityListGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getCommunityListSuccess action if it requests the data successfully', () => {
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
    const response = {
      data: communityList,
    };
    const putDescriptor = filterCommunityListGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getCommunityListSuccess(communityList)));
  });

  it('should dispatch getCommunityListError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = filterCommunityListGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getCommunityListError('Error')));
  });
});

describe('communitySaga Saga', () => {
  const community = communitySaga();
  it('should start task to watch for GET_COMMUNITY_LIST action', () => {
    const takeLatestDescriptor = community.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_COMMUNITY_LIST, getCommunityList),
    );
  });

  it('should start task to watch for GET_COMMUNITY_GROUP_LIST action', () => {
    const takeLatestDescriptor = community.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_COMMUNITY_GROUP_LIST, getCommunityGroupList),
    );
  });

  it('should start task to watch for FILTER_COMMUNITY_LIST action', () => {
    const debounceDescriptor = community.next().value;
    expect(debounceDescriptor).toEqual(
      debounce(1000, FILTER_COMMUNITY_LIST, filterCommunityList),
    );
  });
});
