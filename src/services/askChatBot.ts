import { API_BASE_URL } from "./config.js";

export async function askChatbot(
  question: string,
  conversationId: string,
  responseHandler?: (text: string) => void
): Promise<void | null> {
  if (!question) return null;

  const { pathname, hostname } = new URL(window.location.href);

  const isLocalhost = process.env.NODE_ENV === "development";

  const onlyProd = (value: string) => (!isLocalhost ? value : "");

  const slug = onlyProd(pathname);
  const storeName = onlyProd(hostname.split(".")[0]);
  const platformName = "vtex";

  let text: string = "";

  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        slug,
        storeName,
        platformName,
        conversationId,
      }),
    });

    const reader = res?.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      text += decoder.decode(value, { stream: true });

      console.log("texttext", text);
      if (typeof responseHandler === "function") responseHandler(text);
    }
  } catch (error) {
    console.error("❌ Erro ao chamar o chatbot:", error);

    return null;
  }
}
