import { ChatbotResponse } from "@/types/chatbot.js";
import { API_BASE_URL } from "../config/apiBaseUrl.js";
import Cookies from "js-cookie";

export type AskChatbotResponseHandler = (
  data: string | ChatbotResponse
) => void;

export async function askChatbot(
  question: string,
  conversationId: string,
  responseHandler?: AskChatbotResponseHandler
): Promise<void | null> {
  if (!question) return null;

  let text: string = "";

  try {
    const authToken = Cookies.get("access_token");

    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken || "",
      },
      body: JSON.stringify({
        question,
        conversationId,
        slug: window.location.pathname.match(/\/([^\/]+)\/p/)?.[1] || "",
      }),
    });

    if (!res.ok) {
      if (typeof responseHandler === "function")
        responseHandler("Erro ao se conectar com o chat.");

      return;
    }

    const reader = res?.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decoded = decoder.decode(value, { stream: true });

      if (decoded.match(/"actions":/)) {
        try {
          const decodedAsJSON: ChatbotResponse = JSON.parse(decoded);

          if (typeof responseHandler === "function")
            responseHandler(decodedAsJSON);
        } catch (error) {
          console.error(
            "❌ Erro ao tentar converter objeto da resposta do chat:",
            error
          );
        }

        return;
      }

      text += decoded;

      if (typeof responseHandler === "function") responseHandler(text);
    }
  } catch (error) {
    console.error("❌ Erro ao chamar o chatbot:", error);
    if (typeof responseHandler === "function")
      responseHandler("Erro ao se conectar com o chat.");

    return null;
  }
}
