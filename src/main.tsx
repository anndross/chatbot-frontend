import Widget from "@/Widget";
import tailwindCSS from "@/tailwind.css?inline"; // Importa o CSS gerado

import ReactDOM from "react-dom/client";

export type ChatPositions = "bottom-left" | "left" | "bottom-right" | "right";

export type TriggerPositions = "left" | "right";

export interface MountWidgetProps {
  customInputId?: string;
  customButtonId?: string;
  customInitialMessage?: string;
  chatPosition?: ChatPositions;
  triggerPosition?: TriggerPositions;
}

class AlfredBot extends HTMLElement {
  static get observedAttributes() {
    return [
      "custom-input-id",
      "custom-button-id",
      "custom-inital-message",
      "chat-position",
      "trigger-position",
      "theme-color-primary",
      "theme-color-secondary",
      "theme-color-tertiary",
    ];
  }

  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;
  private styleElement: HTMLStyleElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const customInputId = this.getAttribute("custom-input-id") || "";
    const customButtonId = this.getAttribute("custom-button-id") || "";
    const customInitialMessage =
      this.getAttribute("custom-initial-message") || "";
    const chatPosition = this.getAttribute("chat-position") || "";
    const triggerPosition = this.getAttribute("trigger-position") || "";
    const themeColorPrimary = this.getAttribute("theme-color-primary") || "";
    const themeColorSecondary =
      this.getAttribute("theme-color-secondary") || "";
    const themeColorTertiary = this.getAttribute("theme-color-tertiary") || "";

    const chatPositions: ChatPositions[] = [
      "left",
      "bottom-left",
      "right",
      "bottom-right",
    ];
    const triggerPositions: TriggerPositions[] = ["left", "right"];

    if (!this.shadowRoot) return;

    if (!this.mountPoint) {
      this.shadowRoot.innerHTML = "";

      this.mountPoint = document.createElement("div");

      // Adiciona as fontes no Shadow DOM
      const googleFontsConfig1 = document.createElement("link");
      googleFontsConfig1.rel = "preconnect";
      googleFontsConfig1.href = "https://fonts.googleapis.com";

      const googleFontsConfig2 = document.createElement("link");
      googleFontsConfig2.rel = "preconnect";
      googleFontsConfig2.href = "https://fonts.gstatic.com";
      googleFontsConfig2.crossOrigin = "crossorigin";

      const fontLink1 = document.createElement("link");
      fontLink1.rel = "stylesheet";
      fontLink1.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap";

      this.shadowRoot.appendChild(googleFontsConfig1);
      this.shadowRoot.appendChild(googleFontsConfig2);
      this.shadowRoot.appendChild(fontLink1);

      // Criar um <style> e sempre atualizar com o CSS gerado pelo Tailwind
      if (!this.styleElement) {
        this.styleElement = document.createElement("style");
        this.shadowRoot.appendChild(this.styleElement);
      }
      this.styleElement.textContent = tailwindCSS;

      this.shadowRoot.appendChild(this.mountPoint);
    }

    const rootHost = document.querySelector("alfred-bot") as HTMLElement;

    // Define a cor primária do produto
    themeColorPrimary &&
      rootHost?.style?.setProperty("--color-primary", themeColorPrimary);

    // Define a cor secondária do produto
    themeColorSecondary &&
      rootHost?.style?.setProperty("--color-secondary", themeColorSecondary);

    // Define a cor terciária do produto
    themeColorTertiary &&
      rootHost?.style?.setProperty("--color-tertiary", themeColorTertiary);

    if (!this.root) {
      this.root = ReactDOM.createRoot(this.mountPoint);
    }

    if (
      !window.location.pathname.endsWith("/p") &&
      process.env.NODE_ENV !== "development"
    )
      return;

    this.root.render(
      <Widget
        props={{
          customInputId,
          customButtonId,
          customInitialMessage,
          ...(chatPositions.includes(chatPosition as ChatPositions)
            ? { chatPosition: chatPosition as TriggerPositions }
            : {}),
          ...(triggerPositions.includes(triggerPosition as TriggerPositions)
            ? { triggerPosition: triggerPosition as TriggerPositions }
            : {}),
        }}
      />
    );
  }
}

customElements.define("alfred-bot", AlfredBot);

type CustomGlobalThis = typeof globalThis & {
  addAlfredBot: (props: MountWidgetProps) => void;
};

(globalThis as CustomGlobalThis).addAlfredBot = (props) => {
  const {
    customButtonId,
    customInputId,
    customInitialMessage,
    chatPosition,
    triggerPosition,
  } = props || {};

  const alfredBot = document.createElement("alfred-bot");

  if (chatPosition) {
    alfredBot.setAttribute("chat-position", chatPosition);
  }

  if (triggerPosition) {
    alfredBot.setAttribute("trigger-position", triggerPosition);
  }

  if (customButtonId) {
    alfredBot.setAttribute("custom-button-id", customButtonId);
  }

  if (customInputId) {
    alfredBot.setAttribute("custom-input-id", customInputId);
  }

  if (customInitialMessage) {
    alfredBot.setAttribute("custom-initial-message", customInitialMessage);
  }

  // mantém a tag sobreposta aos elementos da página em que está inserida
  alfredBot.style.position = "fixed";
  alfredBot.style.zIndex = "9999";

  document.body.appendChild(alfredBot);
};
