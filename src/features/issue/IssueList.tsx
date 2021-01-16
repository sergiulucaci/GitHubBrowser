import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';

import { Repository } from '../home/models/Repository';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
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

type IssueListProps = {
  componentId: string;
  repository: Repository;
};

const IssueList = ({ componentId, repository }: IssueListProps) => {
  return (
    <>
      <Row>
        <OwnerAvatar
          resizeMode="contain"
          source={{ uri: repository.owner.avatarUrl }}
        />
        <OwnerTitle>{repository.owner.login}</OwnerTitle>
      </Row>
    </>
  );
};

export default IssueList;
