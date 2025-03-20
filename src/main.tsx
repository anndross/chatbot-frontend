import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Widget from "./Widget";

export interface MountWidgetProps {
  customInput: HTMLInputElement;
  customButton: HTMLButtonElement;
}

function mountWidget(el: HTMLElement, props?: MountWidgetProps) {
  if (!el) return;
  const root = createRoot(el);
  root.render(
    <StrictMode>
      <Widget props={props} />
    </StrictMode>
  );
}

// Se estiver em desenvolvimento, renderiza automaticamente
if (import.meta.env.MODE === "development") {
  const customButton = document.getElementById("widget-custom-trigger")!;
  const customInput = document.getElementById("widget-custom-input")!;

  console.log({
    customButton,
    customInput,
  });

  const devRoot = document.getElementById("widget-container");
  if (devRoot) {
    mountWidget(devRoot);
  }
}

// export default { mountWidget };

// Exporta diretamente para evitar problemas no UMD
(globalThis as any).Widget = { mountWidget };
console.log("globalThis", globalThis);
