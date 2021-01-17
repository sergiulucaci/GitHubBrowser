import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import moment from 'moment';

import { Issue } from '../models/Issue';
import Colors from '../../../theme/Colors';

const Base = styled.TouchableOpacity`
  padding-vertical: 12px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.View``;

const CenterSide = styled.View`
  margin-left: 12px;
  flex: 1;
`;

const RightSide = styled.View``;

const IssueNumber = styled.Text`
  font-size: 13px;
  color: ${Colors.SECONDARY.GRAY};
`;

const IssueTitle = styled.Text`
  font-size: 13px;
  color: ${Colors.SECONDARY.DARK_GRAY};
  font-weight: 500;
  margin-top: 2px;
`;

const LabelWrapper = styled.View`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const LabelItemWrapper = styled.View<{ bgColor: string }>`
  padding-horizontal: 4px;
  padding-vertical: 2px;
  background-color: ${(props) => (props.bgColor !== '000000' ? `#${props.bgColor}` : 'white')};
  border-radius: 12px;
  margin-left: 4px;
  margin-bottom: 4px;
`;

const LabelText = styled.Text`
  color: ${Colors.SECONDARY.DARK_GRAY};
  font-size: 11px;
  font-weight: 500;
`;

const DateTitle = styled.Text`
  font-size: 13px;
  align-self: flex-end;
  color: ${Colors.SECONDARY.GRAY};
`;

const CommentsNumberWrapper = styled.View`
  background-color: ${Colors.SECONDARY.LIGHT_GRAY};
  border-radius: 2px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
  padding-vertical: 2px;
  padding-horizontal: 4px;
`;

const CommentsNumber = styled.Text`
  font-size: 11px;
  color: ${Colors.SECONDARY.DARK_GRAY};
`;

const IssueListItem = ({
  item,
}: {
  item: Issue;
}) => {
  const isOpen = item.state === 'open';
  return (
    <Base delayPressIn={50} onPress={() => {}}>
      <Row>
        <LeftSide>
          <Icon
            size={16}
            name={isOpen ? 'issue-opened' : 'issue-closed'}
            color={isOpen ? Colors.PRIMARY.GREEN : Colors.PRIMARY.ERROR}
          />
        </LeftSide>
        <CenterSide>
          <IssueNumber>{`#${item.number}`}</IssueNumber>
          <IssueTitle>{item.title}</IssueTitle>
          <LabelWrapper>
            {!!item.labels.length
              && item.labels.map((label) => (
                <LabelItemWrapper key={label.id} bgColor={label.color}>
                  <LabelText>{label.name}</LabelText>
                </LabelItemWrapper>
              ))}
          </LabelWrapper>
        </CenterSide>
        <RightSide>
          <DateTitle>{moment(item.createdAt).fromNow(true)}</DateTitle>
          {item.comments ? (
            <CommentsNumberWrapper key={item.id}>
              <CommentsNumber>{item.comments}</CommentsNumber>
            </CommentsNumberWrapper>
          ) : null}
        </RightSide>
      </Row>
    </Base>
  );
};

export default IssueListItem;
