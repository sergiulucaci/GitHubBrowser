import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Repository } from '../../home/models/Repository';
import {
  ScreenContainer,
  ScreenTitle,
  ScreenSubtitle,
  Separator,
} from '../../../components';
import {
  OwnerAvatar,
  OwnerTitle,
  RepoDescription,
  RepoFooter,
} from '../../home/components/RepositoryListItem';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { getIssuesAction } from '../actions/Issue';
import { selectIssue } from '../selectors/Home';
import { IssueStateType } from '../reducers/Issue';
import IssueListItem from './IssueListItem';
import Colors from '../../../theme/Colors';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const NoDataWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
`;

const NoDataTitle = styled.Text`
  color: ${Colors.SECONDARY.DARK_GRAY};
  font-size: 17px;
  font-weight: 500;
  text-align: center;
`;

const LoadingWrapper = styled.ActivityIndicator`
  margin-top: 40px;
`;

type IssueListProps = {
  componentId: string;
  repository: Repository;
};

const IssueList = ({ componentId, repository }: IssueListProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: repository.name,
    additionalPadding: 32,
  });

  useEffect(() => {
    loadIssues({ pageToLoad: page });

    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        alert('go to filters');
      },
    );

    return () => {
      navigationButtonEventListener.remove();
    };
  }, []);

  const loadIssues = ({ pageToLoad }: { pageToLoad: number }) => {
    dispatch(
      getIssuesAction({
        organization: repository.owner.login,
        repository: repository.name,
        page: pageToLoad,
      }),
    );
  };

  const data: IssueStateType = useSelector(selectIssue());

  const ScreenHeader = (
    <>
      <Row>
        <OwnerAvatar
          resizeMode="contain"
          source={{ uri: repository.owner.avatarUrl }}
        />
        <OwnerTitle>{repository.owner.login}</OwnerTitle>
      </Row>
      <ScreenTitle text={repository.name} />
      <RepoDescription>{repository.description}</RepoDescription>
      <RepoFooter
        stargazersCount={repository.stargazersCount}
        language={repository.language}
      />
      <Separator withMarginVertical />
      <ScreenSubtitle text={t('issue.findIssuesTitle')} />
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
          {t('issue.noData')}
        </NoDataTitle>
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
          loadIssues({ pageToLoad });
        }}
        ListHeaderComponent={ScreenHeader}
        ItemSeparatorComponent={() => <Separator />}
        ListEmptyComponent={NoDataComponent}
        data={data.payload}
        renderItem={({ item }) => (
          <IssueListItem componentId={componentId} item={item} />
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default IssueList;
