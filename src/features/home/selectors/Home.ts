import { HomeStateType } from '../Reducers/Home';
import { StateType } from '../../../store/StateType';

export const selectRepository = () => (state: StateType): HomeStateType => state.home;
