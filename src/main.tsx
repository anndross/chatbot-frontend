import Widget from "./Widget";
import tailwindCSS from "./tailwind.css?inline"; // Importa o CSS gerado

import ReactDOM from "react-dom/client";

class AlfredBot extends HTMLElement {
  static get observedAttributes() {
    return ["custom-input-id", "custom-button-id"];
  }

  private root: ReactDOM.Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Garante que o Shadow DOM seja criado no início
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

    if (!this.shadowRoot) return;

    // Apenas cria o mountPoint uma vez
    if (!this.mountPoint) {
      this.shadowRoot.innerHTML = ""; // Limpa o Shadow DOM

      this.mountPoint = document.createElement("div");

      // Adiciona o CSS encapsulado no Shadow DOM
      const style = document.createElement("style");
      style.textContent = tailwindCSS;
      this.shadowRoot.appendChild(style);

      this.shadowRoot.appendChild(this.mountPoint);
    }

    // Apenas cria o React Root uma vez
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.mountPoint);
    }

    // Renderiza o componente React no Shadow DOM
    this.root.render(
      <Widget
        props={{
          customInputId,
          customButtonId,
        }}
      />
    );
  }
}

customElements.define("alfred-bot", AlfredBot);

export interface MountWidgetProps {
  customInputId: string;
  customButtonId: string;
}

// function mountWidget(el: HTMLElement, props?: MountWidgetProps) {
//   let root: Root | null = null;
//   if (el) {
//     root = createRoot(el);
//   } else {
//     const body = document.querySelector("body");

//     if (body) root = createRoot(body);
//   }
//   if (!root) return;

//   root.render(
//     <StrictMode>
//       {!el ? (
//         <div className="fixed right-5 bottom-5">
//           <Widget props={props} />
//         </div>
//       ) : (
//         <Widget props={props} />
//       )}
//     </StrictMode>
//   );
// }

// // Se estiver em desenvolvimento, renderiza automaticamente
// if (import.meta.env.MODE === "development") {
//   const customButton = document.getElementById("widget-custom-trigger")!;
//   const customInput = document.getElementById("widget-custom-input")!;

//   console.log({
//     customButton,
//     customInput,
//   });

//   const devRoot = document.getElementById("widget-container");

//   if (devRoot) {
//     mountWidget(devRoot);
//   }
// }

// // export default { mountWidget };

// // Exporta diretamente para evitar problemas no UMD
// (globalThis as any).Widget = { mountWidget };
// console.log("globalThis", globalThis);
