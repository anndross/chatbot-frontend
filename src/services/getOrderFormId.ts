import axios from "axios";

export async function getOrderFormId() {
  try {
    const { data } = await axios.post("/api/checkout/pub/orderForm");

    console.log(
      "✅ Resposta do chatbot para obter o ID do formulário de pedido:",
      data
    );

    return data.orderFormId;
  } catch (error) {
    console.error("❌ Erro ao obter o ID do formulário de pedido:", error);
    return null;
  }
}
