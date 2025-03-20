import { hydrateRoot } from "react-dom/client";
import { Chat } from "@/chat";

function initializeWidget() {
  if (document.readyState !== "loading") {
    onReady();
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
}

function onReady() {
  try {
    const element = document.createElement("div");
    const shadow = element.attachShadow({ mode: "open" });
    const shadowRoot = document.createElement("div");

    shadowRoot.id = "widget-root";

    const component = <Chat />;

    shadow.appendChild(shadowRoot);
    injectStyle(shadowRoot);
    hydrateRoot(shadowRoot, component);

    document.body.appendChild(element);
  } catch (error) {
    console.warn("Widget initialization failed:", error);
  }
}

function injectStyle(shadowRoot: HTMLElement) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = process.env.WIDGET_CSS_URL || "/style.css";
  shadowRoot.appendChild(link);
}

initializeWidget();
