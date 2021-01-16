import { ApiRepositories } from '../models/Repository';
import { callApi } from '../../../api/Api';

export function getRepository(query: string): Promise<ApiRepositories> {
  const apiConfig: { url: string; method: 'get' } = {
    url: `/search/repositories?q=${query}`,
    method: 'get',
  };

  return callApi({ apiConfig });
}
