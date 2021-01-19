import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  RadioList,
  ScreenContainer,
  XSmallText,
} from '../../../components';
import Colors from '../../../theme/Colors';
import {
  IssueFiltersSortType,
  IssueFiltersStateType,
  setFilters,
} from '../actions/Issue';
import { IssueConstants } from '../constants/IssueConstants';
import { IssueStateType } from '../reducers/Issue';
import { selectIssue } from '../selectors/Issue';

const ScreenContainerWrapper = styled(ScreenContainer)`
  background-color: ${Colors.BACKGROUND.LIGHT_GRAY};
  padding-top: 12px;
`;

const Title = styled(XSmallText)`
  margin-top: 12px;
  margin-left: 16px;
  color: ${Colors.SECONDARY.GRAY};
`;

const filterByItems = [
  {
    key: IssueConstants.Filters.FILTER_BY_OPEN,
    title: i18next.t('issue.filterByOpen'),
  },
  {
    key: IssueConstants.Filters.FILTER_BY_CLOSED,
    title: i18next.t('issue.filterByClosed'),
  },
  {
    key: IssueConstants.Filters.FILTER_BY_ALL,
    title: i18next.t('issue.filterByAll'),
  },
];
const sortByItems = [
  {
    key: IssueConstants.Filters.SORT_BY_CREATED,
    title: i18next.t('issue.sortByCreated'),
  },
  {
    key: IssueConstants.Filters.SORT_BY_UPDATED,
    title: i18next.t('issue.sortByUpdated'),
  },
  {
    key: IssueConstants.Filters.SORT_BY_AMOUNT_OF_COMMENTS,
    title: i18next.t('issue.sortByAmountOfComments'),
  },
];
const paginationItems = [
  {
    key: IssueConstants.Filters.PAGINATION_INFINITE_SCROLLING,
    title: i18next.t('issue.paginationTypeInfiniteScrolling'),
  },
  {
    key: IssueConstants.Filters.PAGINATION_CLASSIC,
    title: i18next.t('issue.paginationTypeClassic'),
    disabled: true,
  },
];

const IssueFilters = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const data: IssueStateType = useSelector(selectIssue());
  const [filterByActiveKey, setFilterByActiveKey] = useState(
    data.filters.state,
  );
  const [sortByActiveKey, setSortByActiveKey] = useState(data.filters.sort);
  const [paginationTypeActiveKey, setPaginationTypeActiveKey] = useState(
    IssueConstants.Filters.PAGINATION_INFINITE_SCROLLING,
  );

  const handleOnFilterByPress = (key: IssueFiltersStateType) => {
    setFilterByActiveKey(key);
    dispatch(
      setFilters({
        state: key,
      }),
    );
  };

  const handleOnSortByPress = (key: IssueFiltersSortType) => {
    setSortByActiveKey(key);
    dispatch(
      setFilters({
        sort: key,
      }),
    );
  };

  return (
    <ScreenContainerWrapper>
      <Title text={t('issue.filterBy')} />
      <RadioList
        onItemPress={handleOnFilterByPress}
        activeKey={filterByActiveKey}
        items={filterByItems}
      />
      <Title text={t('issue.sortBy')} />
      <RadioList
        onItemPress={handleOnSortByPress}
        activeKey={sortByActiveKey}
        items={sortByItems}
      />
      <Title text={t('issue.paginationType')} />
      <RadioList
        onItemPress={(key: string) => setPaginationTypeActiveKey(key)}
        activeKey={paginationTypeActiveKey}
        items={paginationItems}
      />
    </ScreenContainerWrapper>
  );
};

export default IssueFilters;
