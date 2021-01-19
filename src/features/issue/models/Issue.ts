/* eslint-disable camelcase */
import { Repository } from '../../home/models/Repository';

export type ApiIssues = Array<ApiIssue>;

export type ApiIssue = {
  id: number;
  title: string;
  body: string;
  state: string;
  created_at: string;
  comments: number,
  number: number,
  user: ApiIssueUser;
  labels: Array<ApiIssueLabel>;
};

export type ApiIssueUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export type ApiIssueLabel = {
  id: number;
  name: string;
  color: string;
};

export type Issues = Array<Issue>;

export type Issue = {
  id: number;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  comments: number;
  number: number,
  user: IssueUser;
  labels: Array<IssueLabel>;
};

export type IssueWithRepository = {
  id: number;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  comments: number;
  number: number,
  user: IssueUser;
  labels: Array<IssueLabel>;
  repository: Repository;
};

export type IssueUser = {
  id: number;
  login: string;
  avatarUrl: string;
};

export type IssueLabel = {
  id: number;
  name: string;
  color: string;
};

const issueUserMapper = (issueUser: ApiIssueUser): IssueUser => ({
  id: issueUser.id,
  login: issueUser.login,
  avatarUrl: issueUser.avatar_url,
});

const issueMapper = (issue: ApiIssue): Issue => ({
  id: issue.id,
  title: issue.title,
  body: issue.body,
  state: issue.state,
  createdAt: issue.created_at,
  comments: issue.comments,
  number: issue.number,
  user: issueUserMapper(issue.user),
  labels: issue.labels,
});

export const issuesMapper = (issues: ApiIssues): Issues => issues.map(issueMapper);
