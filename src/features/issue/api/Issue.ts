import { ApiIssues } from '../models/Issue';
import { callApi } from '../../../api/Api';

export function getIssues(query: string): Promise<ApiIssues> {
  const apiConfig: { url: string; method: 'get' } = {
    url: `/repos/${query}`,
    method: 'get',
  };

  return callApi({ apiConfig });
}
