import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { debounce } from 'lodash';
import styled from 'styled-components/native';
import { Navigation } from 'react-native-navigation';

import { getRepositoryAction } from '../actions/Home';

import {
  ScopeBar,
  ScreenContainer,
  XLargeText,
  SearchInput,
  Separator,
  LargeText,
  SmallText,
} from '../../../components';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { selectRepository } from '../selectors/Home';
import RepositoryListItem from './RepositoryListItem';
import Colors from '../../../theme/Colors';
import { HomeStateType } from '../reducers/Home';
import { Screens } from '../../../navigation/Screens';
import { navigateToBookmarks } from '../../../navigation/AppNavigation';

const NoDataWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;

const LoadingWrapper = styled.ActivityIndicator`
  margin-top: 40px;
`;

const NoDataTitle = styled(LargeText)`
  text-align: center;
`;

const NoDataSubtitle = styled(SmallText)`
  color: ${Colors.SECONDARY.GRAY};
  margin-top: 4px;
  text-align: center;
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

  const data: HomeStateType = useSelector(selectRepository());

  useEffect(() => {
    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        if (buttonId === Screens.TopNavButtons.Bookmarks) {
          navigateToBookmarks({ componentId });
        }
      },
    );

    return () => {
      navigationButtonEventListener.remove();
    };
  }, []);

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
      <XLargeText text={t('home.containerTitle')} />
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
      return (
        <NoDataWrapper>
          <LoadingWrapper />
        </NoDataWrapper>
      );
    }
    return (
      <NoDataWrapper>
        <NoDataTitle text={t(searchText ? 'search.noResultsTitle' : 'search.noDataYetTitle')} />
        <NoDataSubtitle text={searchText
          ? t('search.noResultsSubtitle', { value: searchText })
          : t('search.noDataYetSubtitle')}
        />
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
