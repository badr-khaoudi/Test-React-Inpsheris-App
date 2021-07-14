import axios from 'axios';
import { communityList, communityGroupList } from '../CommunityApi';

jest.mock('axios');

describe('communityList', () => {
  it('fetches data successfully', async () => {
    const list = [
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
    const data = {
      data: list,
    };
    const options = { orderBy: 'alphabet', filter: 'all' };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(communityList(options)).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/community/list', {
      params: {
        gplusCommunity: 'All',
        ...options,
      },
    });
  });

  it('fetches data erroneously', async () => {
    const options = { orderBy: 'alphabet', filter: 'all' };
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(communityList(options)).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/community/list', {
      params: {
        gplusCommunity: 'All',
        ...options,
      },
    });
  });
});

describe('communityGroupList', () => {
  it('fetches data successfully', async () => {
    const list = [
      {
        groupName: 'Administrateurs',
        uid: 'c255e6cf-cff9-4892-8c92-e5d637a2548c',
        sequenceNumber: 6,
      },
    ];
    const data = {
      data: list,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(communityGroupList()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/communityGroup/list', {
      params: { order: true },
    });
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(communityGroupList()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/communityGroup/list', {
      params: { order: true },
    });
  });
});
