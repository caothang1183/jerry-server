import { CookieOptions, Response as Res } from 'express';
import { CookieModel } from './cookie.model';

export const cookieOptions: CookieOptions = {
  domain: 'localhost',
  secure: false,
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

export const setCookie = (res: Res, data: CookieModel) => {
  res.cookie('user', data.user, cookieOptions);
  res.cookie('token', data.token, cookieOptions);
  return res;
};

export const deleteCookie = (res: Res) => {
  res.cookie('user', '', { ...cookieOptions, maxAge: 0 });
  res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
  return res;
};
