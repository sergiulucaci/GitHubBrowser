/* eslint-disable camelcase */
export type ApiIssueComments = Array<ApiIssueComment>;

export type ApiIssueComment = {
  id: number;
  created_at: string;
  body: string;
  user: ApiIssueCommentUser;
};

export type ApiIssueCommentUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export type IssueComments = Array<IssueComment>;

export type IssueComment = {
  id: number;
  createdAt: string;
  body: string;
  user: IssueCommentUser;
};

export type IssueCommentUser = {
  id: number;
  login: string;
  avatarUrl: string;
};

const commentUserMapper = (commentUser: ApiIssueCommentUser): IssueCommentUser => ({
  id: commentUser.id,
  login: commentUser.login,
  avatarUrl: commentUser.avatar_url,
});

const commentMapper = (comment: ApiIssueComment): IssueComment => ({
  id: comment.id,
  body: comment.body,
  createdAt: comment.created_at,
  user: commentUserMapper(comment.user),
});

export const commentsMapper = (comments: ApiIssueComments): IssueComments => comments.map(commentMapper);
