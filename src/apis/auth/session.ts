/** accessToken을 메모리에서 관리하고 쿠키에서 전달받아 초기화하는 세션 유틸 */

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

let currentAccessToken: string | null = null;
const accessTokenSubscribers = new Set<(accessToken: string | null) => void>();

function notifyAccessTokenChange(): void {
  accessTokenSubscribers.forEach((callback) => {
    callback(currentAccessToken);
  });
}

function readCookieValue(cookieName: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const encodedName = `${encodeURIComponent(cookieName)}=`;
  const cookieParts = document.cookie.split(';').map((cookie) => cookie.trim());

  for (const cookiePart of cookieParts) {
    if (cookiePart.startsWith(encodedName)) {
      return decodeURIComponent(cookiePart.slice(encodedName.length));
    }
  }

  return null;
}

function deleteCookieValue(cookieName: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  document.cookie = `${encodeURIComponent(cookieName)}=; Max-Age=0; Path=/`;
}

export const session = {
  getAccessToken(): string | null {
    return currentAccessToken;
  },

  hasAccessToken(): boolean {
    return currentAccessToken !== null;
  },

  setAccessToken(accessToken: string): void {
    currentAccessToken = accessToken;
    notifyAccessTokenChange();
  },

  clearAccessToken(): void {
    currentAccessToken = null;
    notifyAccessTokenChange();
  },

  subscribe(onAccessTokenChange: (accessToken: string | null) => void): () => void {
    accessTokenSubscribers.add(onAccessTokenChange);

    return () => {
      accessTokenSubscribers.delete(onAccessTokenChange);
    };
  },
};

export function consumeAccessTokenFromCookie(): boolean {
  const accessTokenFromCookie = readCookieValue(ACCESS_TOKEN_COOKIE_NAME);

  if (accessTokenFromCookie === null) {
    return false;
  }

  session.setAccessToken(accessTokenFromCookie);
  deleteCookieValue(ACCESS_TOKEN_COOKIE_NAME);
  return true;
}
