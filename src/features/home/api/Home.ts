import { ApiHomes } from '../models/Home';
import { callApi } from '../../../api/Api';

export function getHome(): Promise<ApiHomes> {
  const apiConfig: { url: string; method: 'get' } = {
    url: '/orgs/octokit/repos',
    method: 'get',
  };

  return callApi({ apiConfig });
}
