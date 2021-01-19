import React, { useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import {
  ScreenContainer,
  ScreenSmallText,
  ScreenTitle,
  Separator,
} from '../../../components';
import { Repository } from '../../home/models/Repository';
import { Issue, Issues } from '../models/Issue';
import {
  OwnerAvatar,
  OwnerTitle,
} from '../../home/components/RepositoryListItem';
import Colors from '../../../theme/Colors';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { addIssueToBookmarks, getIssueCommentsAction, removeIssueFromBookmarks } from '../actions/Issue';
import { selectIssueComment } from '../selectors/IssueComment';
import { IssueCommentStateType } from '../reducers/IssueComment';
import IssueComment from './IssueComment';
import { selectIssueBookmarks } from '../selectors/Issue';

const ScreenContainerWrapper = styled(ScreenContainer)`
  background-color: ${Colors.BACKGROUND.LIGHT_GRAY};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ScreenHeaderWrapper = styled.View`
  background-color: ${Colors.BACKGROUND.WHITE};
  margin-bottom: 12px;
`;

const HeaderSection = styled.View`
  background-color: ${Colors.BACKGROUND.WHITE};
  padding-horizontal: 16px;
  padding-top: 6px;
  padding-bottom: 12px;
  border-bottom-width: 0.5px;
  border-color: ${Colors.SECONDARY.LIGHT_GRAY};
`;

type StateLabelAndIconProps = {
  isOpen?: boolean;
};

const StateLabelAndIcon = styled.View<StateLabelAndIconProps>`
  border-width: 0.5px;
  border-radius: 4px;
  border-color: ${({ isOpen }) => Colors.PRIMARY[isOpen ? 'GREEN' : 'ERROR']};
  background-color: ${({ isOpen }) => Colors.SECONDARY[isOpen ? 'LIGHT_GREEN' : 'LIGHT_ERROR']};
  display: flex;
  flex-direction: row;
  padding-vertical: 2px;
  padding-horizontal: 8px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: 6px;
`;

type StateLabelProps = {
  isOpen?: boolean;
};

const StateLabel = styled(ScreenSmallText)<StateLabelProps>`
  color: ${({ isOpen }) => Colors.PRIMARY[isOpen ? 'GREEN' : 'ERROR']};
  font-weight: 500;
  margin-left: 4px;
`;

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
  color: ${Colors.SECONDARY.DARK_GRAY};
  font-size: 17px;
  font-weight: 500;
  text-align: center;
`;

type IssueDetailProps = {
  componentId: string;
  repository: Repository;
  issue: Issue;
};

const IssueDetail = ({ componentId, repository, issue }: IssueDetailProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: issue.title,
    additionalPadding: 30,
  });
  const isOpen = issue.state === 'open';

  const data: IssueCommentStateType = useSelector(selectIssueComment());
  const bookmarks: Issues = useSelector(selectIssueBookmarks());

  useEffect(() => {
    loadComments({ pageToLoad: page });
  }, []);

  const isBookmarked = useMemo(
    () => bookmarks.find((bookmark) => bookmark.id === issue.id),
    [issue, bookmarks],
  );

  const loadComments = ({ pageToLoad }: { pageToLoad: number }) => {
    dispatch(
      getIssueCommentsAction({
        organization: repository.owner.login,
        repository: repository.name,
        issueNumber: issue.number,
        page: pageToLoad,
      }),
    );
  };

  const onBookmarkPress = () => {
    if (isBookmarked) {
      dispatch(removeIssueFromBookmarks(issue.id));
    } else {
      dispatch(addIssueToBookmarks({ ...issue, repository }));
    }
  };

  const ScreenHeader = (
    <ScreenHeaderWrapper>
      <HeaderSection>
        <Row>
          <OwnerAvatar
            resizeMode="contain"
            source={{ uri: repository.owner.avatarUrl }}
          />
          <OwnerTitle>{`${repository.owner.login}/${repository.name} #${issue.number}`}</OwnerTitle>
          <IonIcon
            size={22}
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            color={Colors.PRIMARY.BLUE}
            onPress={onBookmarkPress}
          />
        </Row>
        <ScreenTitle text={issue.title} />
        <StateLabelAndIcon isOpen={isOpen}>
          <OctIcon
            size={16}
            name={isOpen ? 'issue-opened' : 'issue-closed'}
            color={isOpen ? Colors.PRIMARY.GREEN : Colors.PRIMARY.ERROR}
          />
          <StateLabel
            isOpen={isOpen}
            text={t(isOpen ? 'issue.stateOpen' : 'issue.stateClosed')}
          />
        </StateLabelAndIcon>
      </HeaderSection>
      <IssueComment
        userAvatarUrl={issue.user.avatarUrl}
        userLogin={issue.user.login}
        createdAt={issue.createdAt}
        body={issue.body}
      />
    </ScreenHeaderWrapper>
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
        <NoDataTitle>{t('issue.noCommentsData')}</NoDataTitle>
      </NoDataWrapper>
    );
  };

  return (
    <ScreenContainerWrapper>
      <FlatList
        onScroll={onScroll}
        onEndReached={() => {
          const pageToLoad = page + 1;
          setPage(pageToLoad);
          loadComments({ pageToLoad });
        }}
        ListHeaderComponent={ScreenHeader}
        ItemSeparatorComponent={() => <Separator />}
        ListEmptyComponent={NoDataComponent}
        data={data.payload}
        renderItem={({ item }) => (
          <IssueComment
            userAvatarUrl={item.user.avatarUrl}
            userLogin={item.user.login}
            createdAt={item.createdAt}
            body={item.body}
          />
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainerWrapper>
  );
};

export default IssueDetail;
