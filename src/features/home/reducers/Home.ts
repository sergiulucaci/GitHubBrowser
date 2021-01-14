import { handleActions } from 'redux-actions';

export type HomeStateType = {
  isFetching: boolean;
  error: boolean;
};

export const initialState: HomeStateType = Object.freeze({
  isFetching: false,
  error: false,
});

const booking = handleActions(
  {
    '@HOME/FETCH_RESULTS': (
      state: HomeStateType,
    ): HomeStateType => ({
      ...state,
    }),
  },
  initialState,
);

export default booking;
