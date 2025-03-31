import axios from "axios";
import { Product } from "@/services/getRecommendedProducts";
import { API_BASE_URL } from "@/config/apiBaseUrl";
import { getOrderFormId } from "@/services/getOrderFormId";
import Cookies from "js-cookie";

export async function addProduct(product: Product) {
  try {
    const orderFormId = await getOrderFormId();

    if (!orderFormId) throw new Error("O id do orderForm não foi encontrado.");

    const { data } = await axios.post(
      `${API_BASE_URL}/add-product`,
      {
        product,
        orderFormId,
      },
      {
        headers: {
          authorization: Cookies.get("access_token"),
        },
      }
    );

    if (!data) throw new Error("Houve um erro ao solicitar os dados.");

    return data;
  } catch (error) {
    console.error("❌ Erro ao adicionar o produto:", error);

    return null;
  }
}
