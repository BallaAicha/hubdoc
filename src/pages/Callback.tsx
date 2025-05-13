import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { setAuthenticationUser } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';
import { auth } from './env';

export const Callback: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationHeader: string = 'Basic ' + window.btoa(`${auth.ENV_CLIENT_ID}:${auth.ENV_CLIENT_SECRET}`);

  useEffect(() => {
    getAccessToken();
  }, []);

  async function getAccessToken(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');

    try {
      const response: Response = await fetch(auth.ENV_TOKENEND_POINT, {
        method: 'POST',
        body: new URLSearchParams({
          redirect_uri: auth.ENV_REDIRECT_URI,
          grant_type: 'authorization_code',
          code: code as string,
        }),
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authorizationHeader,
        }),
        redirect: 'follow',
      });

      interface TokenResponse {
        access_token: string;
        refresh_token?: string;
        token_type: string;
        expires_in: number;
      }

      interface DecodedToken {
        givenname: string;
        sn: string;
        mail: string;
        sub: string;
        sgjob?: string;
        c?: string;
        sgservicename?: string;
        sgigg?: string;
        [key: string]: string | undefined;
      }

      const res: TokenResponse = await response.json();
      const decoded: DecodedToken = jwtDecode<DecodedToken>(res.access_token);

      // Store token in localStorage for future use
      localStorage.setItem('access_token', res.access_token);
      if (res.refresh_token) {
        localStorage.setItem('refresh_token', res.refresh_token);
      }

      // Store user info in localStorage
      const userInfo = {
        sub: decoded.sub || '',
        mail: decoded.mail || '',
        email: decoded.mail || '', // Alias for mail
        givenname: decoded.givenname || '',
        sn: decoded.sn || '',
        name: `${decoded.givenname || ''} ${decoded.sn || ''}`.trim(),
        sgjob: decoded.sgjob || '',
        c: decoded.c || '',
        sgservicename: decoded.sgservicename || '',
        sgigg: decoded.sgigg || '',
      };
      localStorage.setItem('user_info', JSON.stringify(userInfo));

      // Dispatch user info to Redux store
      dispatch(
        setAuthenticationUser({
          userName: `${decoded.givenname} ${decoded.sn}`,
          isAuthenticated: true,
          mail: decoded.mail,
          token: res.access_token,
        })
      );

      navigate('/home');
    } catch (error) {
      console.log('Error in fetching token', error);
    }
  }

  return null;
}
