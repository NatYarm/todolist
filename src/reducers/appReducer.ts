const initialState: InitialStateType = {
  status: 'idle',
  error: null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_STATUS':
      return { ...state, status: action.status };
    case 'APP/SET_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET_STATUS', status } as const);
export const setAppErrorAC = (error: AppErrorType) =>
  ({ type: 'APP/SET_ERROR', error } as const);

type InitialStateType = {
  status: RequestStatusType;
  error: AppErrorType;
};

export type AppActionsType = SetRequestStatusType | SetErrorType;

export type SetRequestStatusType = ReturnType<typeof setAppStatusAC>;
export type SetErrorType = ReturnType<typeof setAppErrorAC>;

export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed';
type AppErrorType = string | null;
