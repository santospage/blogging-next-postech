import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_BLOGGING';
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
//const ONE_DAY = ONE_HOUR * 24;
//const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken: string, context?: GetServerSidePropsContext | null) {
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(context, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_HOUR,
      path: '/',
    });
  },
  get(context?: GetServerSidePropsContext | null) {
    const cookies = nookies.get(context);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  delete(context?: GetServerSidePropsContext | null) {
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(context, ACCESS_TOKEN_KEY);
  },
};
