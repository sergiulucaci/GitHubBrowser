import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { debounce } from 'lodash';
import styled from 'styled-components/native';

import { getRepositoryAction } from '../actions/Home';

import {
  ScopeBar,
  ScreenContainer,
  ScreenTitle,
  SearchInput,
} from '../../../components';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { selectRepositories } from '../selectors/Home';
import RepositoryListItem from './RepositoryListItem';
import Colors from '../../../theme/Colors';

const NoDataWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
`;

const LoadingWrapper = styled.ActivityIndicator`
  margin-top: 40px;
`;

const NoDataTitle = styled.Text`
  font-size: 17px;
  font-weight: 500;
  text-align: center;
`;

const NoDataSubtitle = styled.Text`
  color: ${Colors.SECONDARY.GRAY};
  font-size: 14px;
  margin-top: 4px;
  text-align: center;
`;

const Separator = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
`;

const Home = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [searchByOrganizationActive, setSearchByOrganizationActive] = useState(
    true,
  );
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: t('home.topNavTitle'),
  });

  useEffect(() => {
    // dispatch(getHomeAction());
  }, []);

  // const { isFetching, error }: HomeStateType = useSelector(selectHomeInfo());

  const data = useSelector(selectRepositories());

  const onSearch = ({
    value,
    customQuery,
  }: {
    value?: string;
    customQuery?: { organization?: string; repository?: string };
  }) => {
    let query;
    if (customQuery) {
      query = customQuery;
    } else {
      query = searchByOrganizationActive
        ? {
          organization: value,
        }
        : {
          repository: value,
        };
    }
    dispatch(getRepositoryAction(query));
  };

  const handleOnSearchDelayed = useCallback(debounce(onSearch, 500), [
    searchByOrganizationActive,
  ]);
  const onChangeText = (value: string) => {
    setSearchText(value);
    if (value.length === 1) {
      onSearch(({ value }));
    } else {
      handleOnSearchDelayed({ value });
    }
  };

  const onSearchByOrganizationClick = () => {
    if (!searchByOrganizationActive) {
      setSearchByOrganizationActive(true);
      if (searchText) {
        onSearch({ customQuery: { organization: searchText } });
      }
    }
  };

  const onSearchByRepositoryClick = () => {
    if (searchByOrganizationActive) {
      setSearchByOrganizationActive(false);
      if (searchText) {
        onSearch({ customQuery: { repository: searchText } });
      }
    }
  };

  const ScreenHeader = (
    <>
      <ScreenTitle text={t('home.containerTitle')} />
      <SearchInput
        placeholder={t(
          searchByOrganizationActive
            ? 'home.searchByOrganizationPlaceholder'
            : 'home.searchByRepositoryPlaceholder',
        )}
        onChangeText={onChangeText}
        value={searchText}
      />
      <ScopeBar
        firstIsActive={searchByOrganizationActive}
        firstText={t('home.scopeBarOrganizations')}
        onFirstClick={onSearchByOrganizationClick}
        secondText={t('home.scopeBarRepositories')}
        onSecondClick={onSearchByRepositoryClick}
      />
    </>
  );

  const NoDataComponent = () => {
    if (data.isFetching) {
      return <NoDataWrapper><LoadingWrapper /></NoDataWrapper>;
    }
    return (
      <NoDataWrapper>
        <NoDataTitle>{t(searchText ? 'search.noResultsTitle' : 'search.noDataYetTitle')}</NoDataTitle>
        <NoDataSubtitle>
          {searchText ? t('search.noResultsSubtitle', { value: searchText }) : t('search.noDataYetSubtitle')}
        </NoDataSubtitle>
      </NoDataWrapper>
    );
  };

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        onScroll={onScroll}
        ListHeaderComponent={ScreenHeader}
        ItemSeparatorComponent={() => <Separator />}
        ListEmptyComponent={NoDataComponent}
        data={data.payload.items}
        renderItem={({ item }) => <RepositoryListItem item={item} />}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default Home;
