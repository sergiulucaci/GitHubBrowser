export type ApiHomes = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Array<ApiHome>,
};

export type ApiHome = {
  id: number,
};
