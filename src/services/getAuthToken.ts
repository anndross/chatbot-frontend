import axios from "axios";
import { API_BASE_URL } from "../config/apiBaseUrl";

type AuthTokenResponse = {
  access_token: string;
};

export async function getAuthToken(): Promise<
  AuthTokenResponse["access_token"] | null
> {
  try {
    const { data } = await axios.post<AuthTokenResponse>(
      `${API_BASE_URL}/get-auth-token`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!data) throw new Error("Ocorreu um erro ao tentar pegar o token.");

    return data.access_token;
  } catch {
    return null;
  }
}
