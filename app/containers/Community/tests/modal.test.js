/**
 *
 * Tests for CommunityModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import configureStore from '../../../configureStore';
import { DEFAULT_LOCALE } from '../../../i18n';
import { CommunityModal, mapDispatchToProps } from '../modal';
import {
  getCommunityGroupList,
  getCommunityList,
  filterCommunityList,
} from '../actions';

describe('<CommunityModal />', () => {
  const dispatch = jest.fn();
  const formatMessage = jest.fn();
  const store = configureStore({}, browserHistory);
  const communityGroupList = [
    {
      groupName: 'Les services Itelis',
      uid: 'dda2b2ef-4d8c-4494-845e-e1da4d685122',
      sequenceNumber: 12,
    },
  ];
  const communityList = [
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
  const communityListPageOrderBy = {
    name: 'COMMUNITY_LIST_PAGE_ORDER_BY',
    value: 'alphabet',
    type: 'String',
  };
  const communityListPageByGroup = {
    name: 'COMMUNITY_LIST_PAGE_BY_GROUP',
    value: true,
    type: 'Boolean',
  };
  const yammerIntegration = {
    name: 'YAMMER_INTEGRATION',
    value: true,
    type: 'Boolean',
  };
  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <CommunityModal intl={{ formatMessage }} {...props} />
        </IntlProvider>
      </Provider>,
    );
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });

  it('Should call dispatchCommunityGroupList and dispatchCommunityList if communityListPageOrderBy exists', () => {
    const groupListSpy = jest.fn();
    const listSpy = jest.fn();
    renderComponent({
      communityListPageOrderBy,
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
    });
    expect(groupListSpy).toHaveBeenCalled();
    expect(listSpy).toHaveBeenCalled();
  });

  it('Should render AllCommunitiesModal when communityList and communityGroupList is not empty and communityListPageByGroup value is true', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      communityList,
      communityGroupList,
      communityListPageByGroup,
    });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render CommunityModalItems when communityList and communityGroupList is not empty and communityListPageByGroup value is false', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      communityList,
      communityGroupList,
      communityListPageByGroup: { ...communityListPageByGroup, value: false },
    });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render filter when yammerIntegration value is true', () => {
    const { getByTestId } = renderComponent({
      yammerIntegration,
    });
    expect(getByTestId('filterCategory')).not.toBeNull();
  });

  it('Should display retry button when communityListError or communityGroupListError', () => {
    const groupListSpy = jest.fn();
    const listSpy = jest.fn();
    const { getByTestId } = renderComponent({
      communityListPageOrderBy,
      communityListError: 'Error',
      communityGroupListError: 'Error',
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
    });
    expect(getByTestId('retry')).not.toBeNull();
    fireEvent.click(getByTestId('retry'));
    expect(listSpy).toHaveBeenCalled();
    expect(groupListSpy).toHaveBeenCalled();
  });

  it('Should display loading when communityListLoading or communityGroupListLoading is true', () => {
    const { getByTestId } = renderComponent({
      communityListLoading: true,
      communityGroupListLoading: true,
    });
    expect(getByTestId('loading')).not.toBeNull();
  });

  it('Should dispatch filterCommunityList when search is clicked', () => {
    const groupListSpy = jest.fn();
    const filterSpy = jest.fn();
    const listSpy = jest.fn();
    const { getByTestId } = renderComponent({
      communityListPageOrderBy,
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
      dispatchFilterCommunityList: filterSpy,
    });
    fireEvent.click(getByTestId('search'));
    expect(filterSpy).toHaveBeenCalled();
  });

  it('Should dispatch filterCommunityList onChange', () => {
    const groupListSpy = jest.fn();
    const listSpy = jest.fn();
    const filterSpy = jest.fn();
    const { getByTestId } = renderComponent({
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
      dispatchFilterCommunityList: filterSpy,
      communityListPageOrderBy,
    });
    fireEvent.change(getByTestId('query'), { target: { value: 'Lively' } });
    expect(filterSpy).toHaveBeenCalled();
  });

  it('Should close onClick', () => {
    const goBack = jest.fn();
    const { getByTestId } = renderComponent({
      history: { goBack },
    });
    fireEvent.click(getByTestId('close'));
    expect(goBack).toHaveBeenCalled();
  });

  it('Should dispatch filterCommunityList onChange', () => {
    const groupListSpy = jest.fn();
    const listSpy = jest.fn();
    const filterSpy = jest.fn();
    const { getByLabelText } = renderComponent({
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
      dispatchFilterCommunityList: filterSpy,
      yammerIntegration,
      communityListPageOrderBy,
    });
    fireEvent.click(getByLabelText('Lively'));
    expect(filterSpy).toHaveBeenCalled();
    fireEvent.click(getByLabelText('Yammer'));
    expect(filterSpy).toHaveBeenCalled();
    fireEvent.click(getByLabelText('Lively'));
    expect(filterSpy).toHaveBeenCalled();
    fireEvent.click(getByLabelText('Yammer'));
    expect(filterSpy).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchCommunityGroupList', () => {
      it('Should be injected and dispatch getCommunityGroupList', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchCommunityGroupList).toBeDefined();
        result.dispatchCommunityGroupList();
        expect(dispatch).toHaveBeenCalledWith(getCommunityGroupList());
      });
    });

    describe('dispatchCommunityList', () => {
      it('Should be injected and dispatch getCommunityList', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchCommunityList).toBeDefined();
        const options = { orderBy: 'alphabet' };
        result.dispatchCommunityList(options);
        expect(dispatch).toHaveBeenCalledWith(getCommunityList(options));
      });
    });

    describe('dispatchFilterCommunityList', () => {
      it('Should be injected and dispatch filterCommunityList', () => {
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchFilterCommunityList).toBeDefined();
        const options = { orderBy: 'alphabet', filter: 'all' };
        result.dispatchFilterCommunityList(options);
        expect(dispatch).toHaveBeenCalledWith(filterCommunityList(options));
      });
    });
  });
});
