let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessTokenValue = (token: string | null) => {
  accessToken = token;
};