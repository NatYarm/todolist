export type TestsAction<T extends (...args: any) => any> = Omit<ReturnType<T>, 'meta'>;

export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: T;
};
