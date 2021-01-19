import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Repository } from '../models/Repository';
import Colors from '../../../theme/Colors';
import { navigateToIssueList } from '../../../navigation/AppNavigation';
import { LargeText, MediumText, SmallText } from '../../../components';

const Base = styled.TouchableOpacity`
  padding-vertical: 12px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BottomRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const OwnerAvatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 4px;
`;

export const OwnerTitle = styled(SmallText)`
  margin-left: 8px;
  flex: 1;
`;

const BottomText = styled(SmallText)`
  color: ${Colors.SECONDARY.GRAY};
  margin-left: 4px;
`;

export const RepoTitle = styled(LargeText)`
  margin-top: 6px;
`;

export const RepoDescription = styled(MediumText)`
  margin-top: 6px;
`;

const Bullet = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${Colors.PRIMARY.BLUE};
  margin-left: 8px;
`;

export const RepoFooter = ({
  stargazersCount,
  language,
}: {
  stargazersCount: number;
  language: string;
}) => (
  <BottomRow>
    <Row>
      <Icon name="star-outline" size={12} color={Colors.SECONDARY.GRAY} />
      <BottomText text={stargazersCount} />
      <Bullet />
      <BottomText text={language} />
    </Row>
  </BottomRow>
);

const RepositoryListItem = ({
  componentId,
  item,
}: {
  componentId: string;
  item: Repository;
}) => (
  <Base
    delayPressIn={50}
    onPress={() => navigateToIssueList({ componentId, repository: item })}
  >
    <Row>
      <OwnerAvatar
        resizeMode="contain"
        source={{ uri: item.owner.avatarUrl }}
      />
      <OwnerTitle text={item.owner.login} />
    </Row>
    <RepoTitle text={item.name} />
    <RepoDescription text={item.description} />
    <RepoFooter stargazersCount={item.stargazersCount} language={item.language} />
  </Base>
);

export default RepositoryListItem;
