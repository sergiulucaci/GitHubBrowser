import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Octicons';
import moment from 'moment';

import { Issue } from '../models/Issue';
import Colors from '../../../theme/Colors';
import { Repository } from '../../home/models/Repository';
import { navigateToIssueDetail } from '../../../navigation/AppNavigation';
import { MediumText, SmallText, XSmallText } from '../../../components';

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

const IssueNumber = styled(SmallText)`
  color: ${Colors.SECONDARY.GRAY};
`;

const IssueTitle = styled(MediumText)`
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

const LabelText = styled(XSmallText)`
  font-weight: 500;
`;

const DateTitle = styled(SmallText)`
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

const CommentsNumber = styled(SmallText)`
`;

type IssueListItemProps = {
  componentId: string;
  issue: Issue;
  repository: Repository;
};

const IssueListItem = ({
  componentId,
  issue,
  repository,
}: IssueListItemProps) => {
  const isOpen = issue.state === 'open';
  return (
    <Base
      delayPressIn={50}
      onPress={() => navigateToIssueDetail({ componentId, issue, repository })}
    >
      <Row>
        <LeftSide>
          <Icon
            size={16}
            name={isOpen ? 'issue-opened' : 'issue-closed'}
            color={isOpen ? Colors.PRIMARY.GREEN : Colors.PRIMARY.RED}
          />
        </LeftSide>
        <CenterSide>
          <IssueNumber text={`#${issue.number}`} />
          <IssueTitle text={issue.title} />
          <LabelWrapper>
            {!!issue.labels.length
              && issue.labels.map((label) => (
                <LabelItemWrapper key={label.id} bgColor={label.color}>
                  <LabelText text={label.name} />
                </LabelItemWrapper>
              ))}
          </LabelWrapper>
        </CenterSide>
        <RightSide>
          <DateTitle text={moment(issue.createdAt).fromNow(true)} />
          {issue.comments ? (
            <CommentsNumberWrapper key={issue.id}>
              <CommentsNumber text={issue.comments} />
            </CommentsNumberWrapper>
          ) : null}
        </RightSide>
      </Row>
    </Base>
  );
};

export default IssueListItem;
