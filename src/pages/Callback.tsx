import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { setAuthenticationUser } from '../store/authSlice';
import { jwtDecode } from 'jwt-decode';
import { auth } from './env';

// Constants for sessionStorage keys
const CODE_VERIFIER_KEY = 'sg-connect-code-verifier';
const STATE_KEY = 'sg-connect-state';

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
    const sessionState: string | null = urlParams.get('session_state');
    const state: string | null = urlParams.get('state');

    // Retrieve code_verifier from sessionStorage
    const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_KEY);
    const storedState = sessionStorage.getItem(STATE_KEY);

    if (!code) {
      console.error('No authorization code found in URL');
      navigate('/login');
      return;
    }

    // Verify state to prevent CSRF attacks
    if (state && storedState && state !== storedState) {
      console.error('State mismatch - possible CSRF attack');
      alert('Security error: Authentication state mismatch. Please try again.');
      navigate('/login');
      return;
    }

    if (!codeVerifier) {
      console.error('No code_verifier found in sessionStorage');
      alert('Authentication error: Missing security code. Please try again.');
      navigate('/login');
      return;
    }

    console.log('Authorization code received:', code);
    if (sessionState) {
      console.log('Session state received:', sessionState);
    }

    try {
      // Log the request details for debugging
      console.log('Sending token request to:', auth.ENV_TOKENEND_POINT);
      console.log('With redirect_uri:', auth.ENV_REDIRECT_URI);

      const tokenParams = new URLSearchParams({
        redirect_uri: auth.ENV_REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier
      });

      // Add session_state if present
      if (sessionState) {
        tokenParams.append('session_state', sessionState);
      }

      const response: Response = await fetch(auth.ENV_TOKENEND_POINT, {
        method: 'POST',
        body: tokenParams,
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authorizationHeader,
        }),
        redirect: 'follow',
      });

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
          console.error(`Token endpoint returned error: ${response.status} ${response.statusText}`, errorText);
        } catch {
          console.error(`Token endpoint returned error: ${response.status} ${response.statusText}`, 'Could not read error response');
        }

        // Display error message to user
        alert(`Authentication failed. Please try again. (Error: ${response.status})`);
        navigate('/login');
        return;
      }

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

      let res: TokenResponse;
      try {
        res = await response.json();
        console.log('Token response received successfully');
      } catch (jsonError) {
        console.error('Error parsing token response as JSON:', jsonError);
        alert('Authentication failed. Invalid response from server.');
        navigate('/login');
        return;
      }

      if (!res.access_token || typeof res.access_token !== 'string') {
        console.error('Invalid or missing access token in response:', res);
        alert('Authentication failed. Invalid token received.');
        navigate('/login');
        return;
      }

      let decoded: DecodedToken;
      try {
        decoded = jwtDecode<DecodedToken>(res.access_token);
      } catch (decodeError) {
        console.error('Error decoding JWT token:', decodeError);
        alert('Authentication failed. Invalid token format.');
        navigate('/login');
        return;
      }

      // Store token in localStorage for future use
      localStorage.setItem('access_token', res.access_token);
      if (res.refresh_token) {
        localStorage.setItem('refresh_token', res.refresh_token);
      }

      // Clean up sessionStorage for security
      sessionStorage.removeItem(CODE_VERIFIER_KEY);
      sessionStorage.removeItem(STATE_KEY);

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
