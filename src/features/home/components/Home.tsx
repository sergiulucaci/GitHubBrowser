import React, { useCallback, useState } from 'react';
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
import { selectRepository } from '../selectors/Home';
import RepositoryListItem from './RepositoryListItem';
import Colors from '../../../theme/Colors';
import ScreenSubtitle from '../../../components/screen/ScreenSubtitle';
import { RepositoryStateType } from '../reducers/Home';

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
  font-size: 13px;
  margin-top: 4px;
  text-align: center;
`;

const Separator = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
`;

const ScreenSubtitleWrapper = styled(ScreenSubtitle)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const Home = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [searchByOrganizationActive, setSearchByOrganizationActive] = useState(
    true,
  );
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: t('home.topNavTitle'),
  });

  const data: RepositoryStateType = useSelector(selectRepository());

  const resetPageToLoad = () => {
    if (page > 1) {
      setPage(1);
    }
  };

  const loadMoreResults = ({ pageToLoad }: { pageToLoad: number }) => {
    onSearch({ value: searchText, pageToLoad });
  };

  const onSearch = ({
    value,
    customQuery,
    pageToLoad = 1,
  }: {
    value?: string;
    customQuery?: { organization?: string; repository?: string };
    pageToLoad?: number;
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
    dispatch(getRepositoryAction({ ...query, page: pageToLoad }));
  };

  const handleOnSearchDelayed = useCallback(debounce(onSearch, 500), [
    searchByOrganizationActive,
  ]);

  const onChangeText = (value: string) => {
    setSearchText(value);
    resetPageToLoad();
    if (value.length === 1) {
      onSearch({ value });
    } else {
      handleOnSearchDelayed({ value });
    }
  };

  const onSearchByOrganizationClick = () => {
    if (!searchByOrganizationActive) {
      setSearchByOrganizationActive(true);
      if (searchText) {
        resetPageToLoad();
        onSearch({ customQuery: { organization: searchText } });
      }
    }
  };

  const onSearchByRepositoryClick = () => {
    if (searchByOrganizationActive) {
      setSearchByOrganizationActive(false);
      if (searchText) {
        resetPageToLoad();
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
      {/*{!data.isFetching && !!data.payload.totalCount && (*/}
      {/*  <>*/}
      {/*    <ScreenSubtitleWrapper text={`${data.payload.totalCount} results found`} />*/}
      {/*    <Separator />*/}
      {/*  </>*/}
      {/*)}*/}
    </>
  );

  const NoDataComponent = () => {
    if (data.isFetching) {
      return (
        <NoDataWrapper>
          <LoadingWrapper />
        </NoDataWrapper>
      );
    }
    return (
      <NoDataWrapper>
        <NoDataTitle>
          {t(searchText ? 'search.noResultsTitle' : 'search.noDataYetTitle')}
        </NoDataTitle>
        <NoDataSubtitle>
          {searchText
            ? t('search.noResultsSubtitle', { value: searchText })
            : t('search.noDataYetSubtitle')}
        </NoDataSubtitle>
      </NoDataWrapper>
    );
  };

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        onScroll={onScroll}
        onEndReached={() => {
          const pageToLoad = page + 1;
          setPage(pageToLoad);
          loadMoreResults({ pageToLoad });
        }}
        ListHeaderComponent={ScreenHeader}
        ItemSeparatorComponent={() => <Separator />}
        ListEmptyComponent={NoDataComponent}
        data={data.payload.items}
        renderItem={({ item }) => (
          <RepositoryListItem componentId={componentId} item={item} />
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default Home;
