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
  // Add a ref to track if the token request has been made
  const tokenRequestMade = React.useRef(false);

  const authorizationHeader: string = 'Basic ' + window.btoa(`${auth.ENV_CLIENT_ID}:${auth.ENV_CLIENT_SECRET}`);

  useEffect(() => {
    // Only make the token request if it hasn't been made yet
    if (!tokenRequestMade.current) {
      tokenRequestMade.current = true;
      getAccessToken();
    }
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
      // Log timestamp and request details for debugging
      const requestTime = new Date().toISOString();
      console.log(`[${requestTime}] Starting token request`);
      console.log('Sending token request to:', auth.ENV_TOKENEND_POINT);
      console.log('With redirect_uri:', auth.ENV_REDIRECT_URI);

      // Mask sensitive data for logging
      const maskedCode = code ? `${code.substring(0, 4)}...${code.substring(code.length - 4)}` : 'null';
      const maskedVerifier = codeVerifier ? 
        `${codeVerifier.substring(0, 4)}...${codeVerifier.substring(codeVerifier.length - 4)}` : 'null';
      console.log(`Code: ${maskedCode}, Code Verifier: ${maskedVerifier}, Length: ${codeVerifier?.length || 0}`);

      const tokenParams = new URLSearchParams({
        redirect_uri: auth.ENV_REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code,
        code_verifier: codeVerifier
      });

      // Add session_state if present
      if (sessionState) {
        tokenParams.append('session_state', sessionState);
        console.log('Including session_state in request');
      }

      // Create an AbortController to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      let response: Response;
      try {
        response = await fetch(auth.ENV_TOKENEND_POINT, {
          method: 'POST',
          body: tokenParams,
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorizationHeader,
          }),
          redirect: 'follow',
          signal: controller.signal
        });

        // Clear the timeout since the request completed
        clearTimeout(timeoutId);
      } catch (fetchError) {
        // Handle timeout or network errors
        clearTimeout(timeoutId);
        console.error('Fetch error:', fetchError instanceof Error ? fetchError.message : 'Unknown error');
        alert('Network error or timeout. Please check your connection and try again.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        let errorText = '';
        let errorJson = null;

        try {
          errorText = await response.text();
          console.error(`Token endpoint returned error: ${response.status} ${response.statusText}`, errorText);

          // Try to parse the error as JSON
          try {
            errorJson = JSON.parse(errorText);
          } catch {
            console.log('Error response is not valid JSON');
          }

          // Check for specific error types
          if (errorJson && errorJson.error === 'invalid_grant') {
            console.error('Invalid grant error detected');

            if (errorJson.error_description && errorJson.error_description.includes('Inactive authorization code')) {
              console.error('Inactive authorization code error detected');

              // Clear any stored auth data to ensure a fresh start
              sessionStorage.removeItem(CODE_VERIFIER_KEY);
              sessionStorage.removeItem(STATE_KEY);

              alert('Your authentication session has expired. Please try logging in again.');
              navigate('/login');
              return;
            }
          }
        } catch {
          console.error(`Token endpoint returned error: ${response.status} ${response.statusText}`, 'Could not read error response');
        }

        // Generic error message if no specific error was identified
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
        const responseTime = new Date().toISOString();
        console.log(`[${responseTime}] Token response received successfully`);

        // Log token details (safely)
        if (res.access_token) {
          console.log(`Access token received (length: ${res.access_token.length})`);
          if (res.expires_in) {
            console.log(`Token expires in: ${res.expires_in} seconds`);
          }
          if (res.refresh_token) {
            console.log(`Refresh token received (length: ${res.refresh_token.length})`);
          }
        } else {
          console.warn('No access token in response');
        }
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
