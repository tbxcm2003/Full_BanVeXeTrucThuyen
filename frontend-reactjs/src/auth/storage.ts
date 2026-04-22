const TOKEN_KEY = 'banvexe_admin_token';
const EMAIL_KEY = 'banvexe_admin_email';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuth(token: string, email: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
}

export function getStoredEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}
