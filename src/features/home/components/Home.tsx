import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { HomeStateType } from '../reducers/Home';
import { selectHomeInfo } from '../selectors/Home';
import { getHomeAction } from '../actions/Home';

import {
  ScopeBar,
  ScreenContainer,
  ScreenTitle,
  SearchInput,
} from '../../../components';

const Home = ({ componentId }: { componentId: string }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getHomeAction());
  }, []);

  const { isFetching, error }: HomeStateType = useSelector(selectHomeInfo());

  const onChangeText = (value: string) => {
    setSearchText(value);
  };

  return (
    <ScreenContainer>
      <ScreenTitle text={t('home.containerTitle')} />
      <SearchInput onChangeText={onChangeText} value={searchText} />
      <ScopeBar
        firstText={t('home.scopeBarRepositories')}
        onFirstClick={() => {}}
        secondText={t('home.scopeBarOrganizations')}
        onSecondClick={() => {}}
      />
    </ScreenContainer>
  );
};

export default Home;
