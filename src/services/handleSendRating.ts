import { API_BASE_URL } from "@/config/apiBaseUrl";
import axios from "axios";
import Cookies from "js-cookie";

export async function handleSendRating(question: string, answer: string) {
  try {
    await axios.post(
      `${API_BASE_URL}/add-rating`,
      {
        question,
        answer,
        slug: window.location.pathname.match(/\/([^\/]+)\/p/)?.[1] || "",
      },
      {
        headers: {
          authorization: Cookies.get("access_token"),
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
}
