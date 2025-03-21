import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import "./index.css";
import Widget from "./Widget";

export interface MountWidgetProps {
  customInput: HTMLInputElement;
  customButton: HTMLButtonElement;
}

function mountWidget(el: HTMLElement, props?: MountWidgetProps) {
  let root: Root | null = null;
  if (el) {
    root = createRoot(el);
  } else {
    const body = document.querySelector("body");

    if (body) root = createRoot(body);
  }
  if (!root) return;

  root.render(
    <StrictMode>
      {!el ? (
        <div className="fixed right-5 bottom-5">
          <Widget props={props} />
        </div>
      ) : (
        <Widget props={props} />
      )}
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
