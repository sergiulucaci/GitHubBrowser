import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Repository } from '../models/Repository';
import Colors from '../../../theme/Colors';
import { navigateToIssueList } from '../../../navigation/AppNavigation';

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

export const OwnerTitle = styled.Text`
  font-size: 13px;
  color: ${Colors.SECONDARY.DARK_GRAY};
  margin-left: 8px;
`;

const BottomText = styled.Text`
  font-size: 13px;
  color: ${Colors.SECONDARY.GRAY};
  margin-left: 4px;
`;

const RepoTitle = styled.Text`
  font-size: 17px;
  color: ${Colors.SECONDARY.DARK_GRAY};
  font-weight: 600;
  margin-top: 6px;
`;

export const RepoDescription = styled.Text`
  font-size: 17px;
  color: ${Colors.SECONDARY.DARK_GRAY};
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
      <BottomText>{stargazersCount}</BottomText>
      <Bullet />
      <BottomText>{language}</BottomText>
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
      <OwnerTitle>{item.owner.login}</OwnerTitle>
    </Row>
    <RepoTitle>{item.name}</RepoTitle>
    <RepoDescription>{item.description}</RepoDescription>
    <RepoFooter stargazersCount={item.stargazersCount} language={item.language} />
  </Base>
);

export default RepositoryListItem;
