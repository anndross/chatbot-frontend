import { useChat } from "@/chat/context";
import { getAuthToken } from "@/services/getAuthToken";
import { verifyToken } from "@/services/verifyToken";
import Cookies from "js-cookie";
import { useCallback } from "react";

export function useAuth() {
  const { updateAuth } = useChat();

  const authenticate = useCallback(async () => {
    const storedAuthToken = Cookies.get("access_token");
    const updateToken = (token: string | null) => updateAuth({ token });

    if (storedAuthToken && verifyToken(storedAuthToken)) {
      updateToken(storedAuthToken);
    } else {
      const token = await getAuthToken();

      if (token?.length) Cookies.set("access_token", token);

      updateToken(token);
    }
  }, []);

  return authenticate;
}
