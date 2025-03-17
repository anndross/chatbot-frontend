class MeuChatbot extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });

      // Criar um container para o iframe
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.width = "350px";
      container.style.height = "500px";
      container.style.borderRadius = "10px";
      container.style.overflow = "hidden";
      container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";

      // Criar o iframe
      const iframe = document.createElement("iframe");
      iframe.src = "https://meuservidor.com/chatbot.html"; // Página com React
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "none";

      container.appendChild(iframe);
      this.shadowRoot.appendChild(container);

      // Comunicação entre site e iframe
      window.addEventListener("message", (event) => {
        if (event.data === "openChat") {
          container.style.display = "block";
        }
      });
    }
  }
}

// Registrar o Web Component
customElements.define("meu-chatbot", MeuChatbot);
