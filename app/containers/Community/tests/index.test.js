/**
 *
 * Tests for Community
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
import { Community, mapDispatchToProps } from '../index';
import { getCommunityGroupList, getCommunityList } from '../actions';

describe('<Community />', () => {
  const dispatch = jest.fn();
  const formatMessage = jest.fn();
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
  const store = configureStore({}, browserHistory);
  const renderComponent = (props = {}) =>
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <Community
            intl={{ formatMessage }}
            communityGroupList={communityGroupList}
            {...props}
          />
        </IntlProvider>
      </Provider>,
    );

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent();
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = renderComponent();
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render AllCommunities when communityList and communityGroupList is not empty and communityListPageByGroup value is true', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      communityList,
      communityGroupList,
      communityListPageByGroup,
    });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should setSelectedGroup onChange', () => {
    const { getByTestId } = renderComponent({
      communityList,
      communityGroupList,
      communityListPageByGroup,
    });
    fireEvent.mouseDown(getByTestId('select'));
    fireEvent.click(getByTestId('Les services Itelis'));
  });

  it('Should render CommunityItems when communityList and communityGroupList is not empty and communityListPageByGroup value is false', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      communityList,
      communityGroupList,
      communityListPageByGroup: { ...communityListPageByGroup, value: false },
    });
    expect(firstChild).toMatchSnapshot();
  });

  it('Should render Communities when communityList and communityGroupList is not empty', () => {
    const {
      container: { firstChild },
    } = renderComponent({
      communityList,
      communityGroupList,
    });
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

  it('Should display retry button when communityGroupListError', () => {
    const groupListSpy = jest.fn();
    const { getByTestId } = renderComponent({
      communityGroupListError: 'Error',
      dispatchCommunityGroupList: groupListSpy,
    });
    expect(getByTestId('groupListRetry')).not.toBeNull();
    fireEvent.click(getByTestId('groupListRetry'));
    expect(groupListSpy).toHaveBeenCalled();
  });

  it('Should display retry button when communityListError', () => {
    const groupListSpy = jest.fn();
    const listSpy = jest.fn();
    const { getByTestId } = renderComponent({
      communityListPageOrderBy,
      communityListError: 'Error',
      dispatchCommunityGroupList: groupListSpy,
      dispatchCommunityList: listSpy,
    });
    expect(getByTestId('listRetry')).not.toBeNull();
    fireEvent.click(getByTestId('listRetry'));
    expect(listSpy).toHaveBeenCalled();
  });

  it('Should display loading when communityListLoading or communityGroupListLoading is true', () => {
    const { getByTestId } = renderComponent({
      communityListLoading: true,
      communityGroupListLoading: true,
    });
    expect(getByTestId('loading')).not.toBeNull();
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
  });
});
