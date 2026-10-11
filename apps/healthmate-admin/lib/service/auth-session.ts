const AUTH_TOKEN_KEY = 'access_token';

export function setAuthSession(token: string) {
  if (typeof token !== 'string' || !token.trim()) {
    throw new Error('Authentication response is missing an access token.');
  }

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  // The proxy needs a cookie; localStorage is only available in the browser.
  document.cookie = `${AUTH_TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; SameSite=Lax${secure}`;
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}
