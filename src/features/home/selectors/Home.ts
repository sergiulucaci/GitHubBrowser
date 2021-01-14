import { HomeStateType } from '../Reducers/Home';
import { StateType } from '../../../store/StateType';

export const selectHomeInfo = () => (state: StateType): HomeStateType => {
  const { isFetching, error } = state.home;
  return {
    isFetching,
    error,
  };
};
