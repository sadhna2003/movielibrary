const TOKEN_KEY = "token";
const USER_KEY = "user";

/**
 * Save token and user info in localStorage
 */
/**
 * Set token & user in localStorage (only runs in browser)
 */
export const setAuthData = (token, user) => {
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);

    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }
};

/**
 * Get user info from localStorage
 */
export const getUser = () => {
  if (typeof window === "undefined") return null; // SSR guard
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * Get token from localStorage
 */
export const getToken = () => {
  if (typeof window === "undefined") return null; // SSR guard
  return localStorage.getItem(TOKEN_KEY);
};
/**
 * Clear auth data from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken() && !!getUser();
};
