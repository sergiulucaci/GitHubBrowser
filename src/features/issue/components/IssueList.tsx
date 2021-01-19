import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';

import { Repository } from '../../home/models/Repository';
import {
  ScreenContainer,
  LargeText,
  Separator,
} from '../../../components';
import {
  OwnerAvatar,
  OwnerTitle,
  RepoDescription,
  RepoFooter,
  RepoTitle,
} from '../../home/components/RepositoryListItem';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { getIssuesAction } from '../actions/Issue';
import { selectIssue } from '../selectors/Issue';
import { IssueStateType } from '../reducers/Issue';
import IssueListItem from './IssueListItem';
import { navigateToIssueFilters } from '../../../navigation/AppNavigation';
import { Screens } from '../../../navigation/Screens';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

const NoDataWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 20px;
`;

const NoDataTitle = styled(LargeText)`
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
    additionalPadding: 26,
  });

  const data: IssueStateType = useSelector(selectIssue());

  useEffect(() => {
    loadIssues({ pageToLoad: page });

    const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
      ({ buttonId }) => {
        switch (buttonId) {
          case Screens.TopNavButtons.FilterIssues: {
            navigateToIssueFilters({ repository });
            break;
          }
          case Screens.TopNavButtons.FilterIssuesDone: {
            Navigation.dismissAllModals();
            break;
          }
          default:
            break;
        }
      },
    );

    const modalDismissedEventListener = Navigation.events().registerModalDismissedListener(
      () => {
        loadIssues({ pageToLoad: 1 });
      },
    );

    return () => {
      navigationButtonEventListener.remove();
      modalDismissedEventListener.remove();
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

  const ScreenHeader = (
    <>
      <Row>
        <OwnerAvatar
          resizeMode="contain"
          source={{ uri: repository.owner.avatarUrl }}
        />
        <OwnerTitle text={repository.owner.login} />
      </Row>
      <RepoTitle text={repository.name} />
      <RepoDescription text={repository.description} />
      <RepoFooter
        stargazersCount={repository.stargazersCount}
        language={repository.language}
      />
      <Separator withMarginVertical />
      <LargeText text={t('issue.findIssuesTitle')} />
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
        <NoDataTitle text={t('issue.noData')} />
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
          <IssueListItem
            componentId={componentId}
            issue={item}
            repository={repository}
          />
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default IssueList;
