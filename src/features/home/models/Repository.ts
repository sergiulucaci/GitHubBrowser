/* eslint-disable camelcase */
export type ApiRepositories = {
  total_count: number,
  incomplete_results: false,
  items: Array<ApiRepository>,
};

export type ApiRepository = {
  id: number,
  name: string,
  description: string,
  stargazers_count: number,
  language: string,
  owner: ApiRepositoryOwner,
};

export type ApiRepositoryOwner = {
  id: number,
  login: string,
  avatar_url: string,
}
