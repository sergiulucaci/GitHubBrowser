import { ApiIssues } from '../models/Issue';
import { callApi } from '../../../api/Api';

type GetIssuesParam = {
  organization: string;
  repository: string;
  query: string;
}

export function getIssues(data: GetIssuesParam): Promise<ApiIssues> {
  const { organization, repository, query } = data;
  const apiConfig: { url: string; method: 'get' } = {
    url: `/repos/${organization}/${repository}/issues?${query}`,
    method: 'get',
  };

  return callApi({ apiConfig });
}

type GetIssueCommentsParam = {
  organization: string;
  repository: string;
  issueNumber: number;
  query: string;
}

export function getIssueComments(data: GetIssueCommentsParam): Promise<ApiIssues> {
  const {
    organization,
    repository,
    query,
    issueNumber,
  } = data;
  const apiConfig: { url: string; method: 'get' } = {
    url: `/repos/${organization}/${repository}/issues/${issueNumber}/comments?${query}`,
    method: 'get',
  };

  return callApi({ apiConfig });
}
