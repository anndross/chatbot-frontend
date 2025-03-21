import Widget from "./Widget";
import tailwindCSS from "./tailwind.css?inline"; // Importa o CSS gerado

import ReactDOM from "react-dom/client";

export type ChatPositions = "left-bottom" | "left" | "right-bottom" | "right";

export type TriggerPositions = "left-bottom" | "right-bottom";

export interface MountWidgetProps {
  customInputId: string;
  customButtonId: string;
  chatPosition?: ChatPositions;
  triggerPosition?: TriggerPositions;
}

class AlfredBot extends HTMLElement {
  static get observedAttributes() {
    return [
      "custom-input-id",
      "custom-button-id",
      "chat-position",
      "trigger-position",
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
    const chatPosition = this.getAttribute("chat-position") || "";
    const triggerPosition = this.getAttribute("trigger-position") || "";

    const chatPositions: ChatPositions[] = [
      "left",
      "left-bottom",
      "right",
      "right-bottom",
    ];
    const triggerPositions: TriggerPositions[] = [
      "left-bottom",
      "right-bottom",
    ];

    if (!this.shadowRoot) return;

    if (!this.mountPoint) {
      this.shadowRoot.innerHTML = "";

      this.mountPoint = document.createElement("div");

      // Adiciona as fontes no Shadow DOM
      const fontLink1 = document.createElement("link");
      fontLink1.rel = "stylesheet";
      fontLink1.href =
        "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap";

      const fontLink2 = document.createElement("link");
      fontLink2.rel = "stylesheet";
      fontLink2.href =
        "https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap";

      this.shadowRoot.appendChild(fontLink1);
      this.shadowRoot.appendChild(fontLink2);

      // Criar um <style> e sempre atualizar com o CSS gerado pelo Tailwind
      if (!this.styleElement) {
        this.styleElement = document.createElement("style");
        this.shadowRoot.appendChild(this.styleElement);
      }
      this.styleElement.textContent = tailwindCSS;

      this.shadowRoot.appendChild(this.mountPoint);
    }

    if (!this.root) {
      this.root = ReactDOM.createRoot(this.mountPoint);
    }

    this.root.render(
      <Widget
        props={{
          customInputId,
          customButtonId,
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
