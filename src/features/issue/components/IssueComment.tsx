import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import Markdown from 'react-native-markdown-display';

import Colors from '../../../theme/Colors';
import { MediumText } from '../../../components';

const Base = styled.View`
  padding-vertical: 12px;
  padding-horizontal: 16px;
  background-color: ${Colors.BACKGROUND.WHITE};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MarkdownWrapper = styled.View`
  padding-top: 6px;
`;

const UserAvatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: ${Colors.SECONDARY.LIGHT_GRAY};
`;

const UserTitleWrapper = styled.Text`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-left: 8px;
`;

const UserTitle = styled(MediumText)`
`;

const UserTitleGrayed = styled(MediumText)`
  color: ${Colors.SECONDARY.GRAY};
`;

type IssueCommentProps = {
  userAvatarUrl: string;
  userLogin: string;
  createdAt: string;
  body: string;
};

const IssueCommentComponent = ({
  userAvatarUrl, userLogin, createdAt, body,
}: IssueCommentProps) => (
  <Base>
    <Row>
      <UserAvatar
        resizeMode="contain"
        source={{ uri: userAvatarUrl }}
      />
      <UserTitleWrapper>
        <UserTitle text={`${userLogin}`} />
        <UserTitleGrayed text={` \u2022 ${moment(createdAt).fromNow(true)}`} />
      </UserTitleWrapper>
    </Row>
    <MarkdownWrapper>
      <Markdown>
        {body}
      </Markdown>
    </MarkdownWrapper>
  </Base>
);

export default IssueCommentComponent;
