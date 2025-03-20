import axios from "axios";
import { Product } from "./getRecommendedProducts";
import { API_BASE_URL } from "./config";
import { getOrderFormId } from "./getOrderFormId";

export async function addProduct(
  product: Product,
  storeName: string,
  platformName: string
) {
  try {
    const orderFormId = await getOrderFormId();

    if (!orderFormId) throw new Error("O id do orderForm não foi encontrado.");

    const { data } = await axios.post(`${API_BASE_URL}/add-product`, {
      product,
      storeName,
      platformName,
      orderFormId,
    });

    if (!data) throw new Error("Houve um erro ao solicitar os dados.");

    return data;
  } catch (error) {
    console.error("❌ Erro ao adicionar o produto:", error);

    return null;
  }
}
