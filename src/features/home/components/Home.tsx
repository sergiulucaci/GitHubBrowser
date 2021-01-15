import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';

import { HomeStateType } from '../reducers/Home';
import { selectHomeInfo } from '../selectors/Home';
import { getHomeAction } from '../actions/Home';

import {
  ScopeBar,
  ScreenContainer,
  ScreenTitle,
  SearchInput,
} from '../../../components';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';

const Home = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: t('home.topNavTitle'),
  });
  useEffect(() => {
    dispatch(getHomeAction());
  }, []);

  const { isFetching, error }: HomeStateType = useSelector(selectHomeInfo());

  const onChangeText = (value: string) => {
    setSearchText(value);
  };

  const renderScreenHeader = () => (
    <>
      <ScreenTitle text={t('home.containerTitle')} />
      <SearchInput onChangeText={onChangeText} value={searchText} />
      <ScopeBar
        firstText={t('home.scopeBarRepositories')}
        onFirstClick={() => {}}
        secondText={t('home.scopeBarOrganizations')}
        onSecondClick={() => {}}
      />
    </>
  );

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        onScroll={onScroll}
        ListHeaderComponent={renderScreenHeader}
        data={[
          { id: 1, title: 1 },
          { id: 2, title: 2 },
          { id: 3, title: 3 },
          { id: 4, title: 4 },
          { id: 5, title: 5 },
          { id: 6, title: 6 },
          { id: 7, title: 7 },
          { id: 8, title: 8 },
          { id: 11, title: 11 },
          { id: 21, title: 21 },
          { id: 31, title: 31 },
          { id: 41, title: 41 },
          { id: 51, title: 51 },
          { id: 61, title: 61 },
          { id: 71, title: 71 },
          { id: 81, title: 81 },
          { id: 111, title: 111 },
          { id: 211, title: 211 },
          { id: 311, title: 311 },
          { id: 411, title: 411 },
          { id: 511, title: 511 },
          { id: 611, title: 611 },
          { id: 711, title: 711 },
          { id: 811, title: 811 },
          { id: 1111, title: 1111 },
          { id: 2111, title: 2111 },
          { id: 3111, title: 3111 },
          { id: 4111, title: 4111 },
          { id: 5111, title: 5111 },
          { id: 6111, title: 6111 },
          { id: 7111, title: 7111 },
          { id: 8111, title: 8111 },
        ]}
        renderItem={({ item }) => (
          <View style={{ height: 32 }}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default Home;
