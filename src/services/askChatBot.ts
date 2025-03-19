import axios from "axios";
import { API_BASE_URL } from "./config.js";

export async function askChatbot(
  question: string,
  location: string,
  conversationId: string
): Promise<string | null> {
  if (!question) return null;

  const { pathname, hostname } = new URL(location);

  const isLocalhost = process.env.NODE_ENV === "development";

  const onlyProd = (value: string) => (!isLocalhost ? value : "");

  const slug = onlyProd(pathname);
  const storeName = onlyProd(hostname.split(".")[0]);
  const platformName = "vtex";

  try {
    const { data } = await axios.post(`${API_BASE_URL}/chat`, {
      question,
      slug,
      storeName,
      platformName,
      conversationId,
    });

    const { final_response } = data.response;

    return final_response;
  } catch (error) {
    console.error("❌ Erro ao chamar o chatbot:", error);
    return null;
  }
}
