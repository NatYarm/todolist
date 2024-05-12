import { instance } from 'common/instance';
import { BaseResponseType } from 'common/types';

export const authAPI = {
  login(data: LoginParams) {
    return instance.post<BaseResponseType<{ userId?: number }>>('auth/login', data);
  },
  logout() {
    return instance.delete<BaseResponseType>('auth/login');
  },
  me() {
    return instance.get<BaseResponseType<UserData>>('auth/me');
  },
};

type UserData = { id: number; email: string; login: string };

export type LoginParams = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
