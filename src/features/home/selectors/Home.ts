import { RepositoryStateType } from '../Reducers/Home';
import { StateType } from '../../../store/StateType';

export const selectRepository = () => (state: StateType): RepositoryStateType => state.home;
