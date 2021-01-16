import { RepositoryStateType } from '../Reducers/Home';
import { StateType } from '../../../store/StateType';

export const selectHomeInfo = () => (state: StateType): { isFetching: boolean, error: Error } => {
  const { isFetching, error } = state.home;
  return {
    isFetching,
    error,
  };
};

export const selectRepositories = () => (state: StateType): RepositoryStateType => {
  return state.home;
};
