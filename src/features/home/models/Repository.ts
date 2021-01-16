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

export type Repositories = {
  totalCount: number,
  incompleteResults: false,
  items: Array<Repository>,
};

export type Repository = {
  id: number,
  name: string,
  description: string,
  stargazersCount: number,
  language: string,
  owner: RepositoryOwner,
};

export type RepositoryOwner = {
  id: number,
  login: string,
  avatarUrl: string,
};

const repositoryOwnerMapper = (repositoryOwner: ApiRepositoryOwner): RepositoryOwner => ({
  id: repositoryOwner.id,
  login: repositoryOwner.login,
  avatarUrl: repositoryOwner.avatar_url,
});

const repositoryMapper = (repository: ApiRepository): Repository => ({
  id: repository.id,
  name: repository.name,
  description: repository.description,
  stargazersCount: repository.stargazers_count,
  language: repository.language,
  owner: repositoryOwnerMapper(repository.owner),
});

export const repositoriesMapper = (repositories: ApiRepositories): Repositories => ({
  totalCount: repositories.total_count,
  incompleteResults: repositories.incomplete_results,
  items: repositories.items.map(repositoryMapper),
});
