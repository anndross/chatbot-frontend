import axios from "axios";
import { API_BASE_URL } from "./config.js";
import { ChatbotResponse } from "../types/chatbot.js";

export async function askChatbot(
  question: string,
  conversationId: string
): Promise<ChatbotResponse["response"] | null> {
  if (!question) return null;

  const { pathname, hostname } = new URL(window.location.href);

  const isLocalhost = process.env.NODE_ENV === "development";

  const onlyProd = (value: string) => (!isLocalhost ? value : "");

  const slug = onlyProd(pathname);
  const storeName = onlyProd(hostname.split(".")[0]);
  const platformName = "vtex";

  try {
    const { data } = await axios.post<ChatbotResponse>(`${API_BASE_URL}/chat`, {
      question,
      slug,
      storeName,
      platformName,
      conversationId,
    });

    return data.response;
  } catch (error) {
    console.error("❌ Erro ao chamar o chatbot:", error);

    return null;
  }
}
