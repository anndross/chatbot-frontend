import axios from "axios";
import { API_BASE_URL } from "./config";

type AuthTokenResponse = {
  auth_token: string;
};

export async function getAuthToken(): Promise<
  AuthTokenResponse["auth_token"] | null
> {
  try {
    const { data } = await axios.post<AuthTokenResponse>(
      `${API_BASE_URL}/get-access-token`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!data) throw new Error("Ocorreu um erro na requisição.");

    return data.auth_token;
  } catch {
    return null;
  }
}
