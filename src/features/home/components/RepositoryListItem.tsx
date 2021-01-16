import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { ApiRepository } from '../models/Repository';
import Colors from '../../../theme/Colors';

const Base = styled.View`
  margin-vertical: 12px;
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

const OwnerAvatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 4px;
`;

const OwnerTitle = styled.Text`
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

const RepoDescription = styled.Text`
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

const RepositoryListItem = ({ item }: { item: ApiRepository }) => (
  <Base>
    <Row>
      <OwnerAvatar
        resizeMode="contain"
        source={{ uri: item.owner.avatar_url }}
      />
      <OwnerTitle>{item.owner.login}</OwnerTitle>
    </Row>
    <RepoTitle>{item.name}</RepoTitle>
    <RepoDescription>{item.description}</RepoDescription>
    <BottomRow>
      <Row>
        <Icon name="star-outline" size={12} color={Colors.SECONDARY.GRAY} />
        <BottomText>{item.stargazers_count}</BottomText>
        <Bullet />
        <BottomText>{item.language}</BottomText>
      </Row>
    </BottomRow>
  </Base>
);

export default RepositoryListItem;
