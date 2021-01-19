import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  ScreenContainer,
  ScreenTitle,
} from '../../../components';
import useSetScreenTitleOnScroll from '../../../hooks/useSetScreenTitleOnScroll';
import { selectIssueBookmarks } from '../selectors/Issue';
import IssueListItem from './IssueListItem';
import Colors from '../../../theme/Colors';
import { IssueWithRepository } from '../models/Issue';

const NoDataWrapper = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 50px;
`;

const NoDataTitle = styled.Text`
  color: ${Colors.SECONDARY.DARK_GRAY};
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

type IssueBookmarkListProps = {
  componentId: string;
};

const IssueBookmarkList = ({
  componentId,
}: IssueBookmarkListProps) => {
  const { t } = useTranslation();
  const { onScroll } = useSetScreenTitleOnScroll({
    componentId,
    title: t('issue.bookmarksTitle'),
  });

  const data: Array<IssueWithRepository> = useSelector(selectIssueBookmarks());

  const NoDataComponent = () => (
    <NoDataWrapper>
      <NoDataTitle>{t('issue.noBookmarks')}</NoDataTitle>
      <NoDataSubtitle>
        {t('issue.noBookmarksSubtitle')}
      </NoDataSubtitle>
    </NoDataWrapper>
  );

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        onScroll={onScroll}
        ListHeaderComponent={<ScreenTitle text={t('issue.bookmarksTitle')} />}
        ListEmptyComponent={NoDataComponent}
        data={data}
        renderItem={({ item }) => (
          <IssueListItem
            componentId={componentId}
            issue={item}
            repository={item.repository}
          />
        )}
        keyExtractor={(item: { id: number }) => String(item.id)}
      />
    </ScreenContainer>
  );
};

export default IssueBookmarkList;
