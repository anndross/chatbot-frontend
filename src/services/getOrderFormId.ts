import axios from "axios";

export async function getOrderFormId() {
  try {
    const { data } = await axios.post("/api/checkout/pub/orderForm");

    return data.orderFormId;
  } catch (error) {
    console.error("❌ Erro ao obter o ID do formulário de pedido:", error);
    return null;
  }
}
