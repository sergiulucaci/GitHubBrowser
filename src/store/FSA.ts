export type FSA<T = Object> = {
  type: string,
  payload: T,
  error?: boolean,
};

export type FSAError = FSA<{ error: Error }>;
