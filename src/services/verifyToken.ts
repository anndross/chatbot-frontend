import { decodeTokenPayload } from "./decodeToken";

export const verifyToken = (token: string) => {
  const payload = decodeTokenPayload(token);

  if (!payload || !payload.exp) return false;

  const currentTime = Date.now() / 1000;

  return payload.exp >= currentTime;
};
