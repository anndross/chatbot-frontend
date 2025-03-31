import axios from "axios";
import { API_BASE_URL } from "@/config/apiBaseUrl";
import { RecommendedProductsType } from "@/types/chatbot";
import Cookies from "js-cookie";

export type Product = {
  name: string;
  imageUrl: string;
  price: number;
  listPrice: number;
  itemId: string;
  link: string;
  sellerId: string;
};

export interface RecommendedProductsResponse {
  recommendedProductsData: Product[];
}

export async function getRecommendedProducts(
  recommendedProducts: RecommendedProductsType
) {
  if (!recommendedProducts?.length) return null;

  try {
    const { data } = await axios.post<RecommendedProductsResponse>(
      `${API_BASE_URL}/recommended-products`,
      {
        recommendedProductsIds: recommendedProducts,
      },
      {
        headers: {
          authorization: Cookies.get("access_token"),
        },
      }
    );

    if (!data) return null;

    return data;
  } catch (error) {
    console.error("❌ Erro ao pegar os produtos recomendados:", error);

    return null;
  }
}
