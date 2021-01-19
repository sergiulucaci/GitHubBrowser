import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  LargeText,
  ScreenContainer,
  SmallText,
  XLargeText,
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

const NoDataTitle = styled(LargeText)`
  text-align: center;
`;

const NoDataSubtitle = styled(SmallText)`
  color: ${Colors.SECONDARY.GRAY};
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
      <NoDataTitle text={t('issue.noBookmarks')} />
      <NoDataSubtitle text={t('issue.noBookmarksSubtitle')} />
    </NoDataWrapper>
  );

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={{ marginHorizontal: 16 }}
        onScroll={onScroll}
        ListHeaderComponent={<XLargeText text={t('issue.bookmarksTitle')} />}
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
