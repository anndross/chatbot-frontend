import axios from "axios";
import { API_BASE_URL } from "./config";
import { RecommendedProductsType } from "../types/chatbot";

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
  recommendedProducts: RecommendedProductsType,
  storeName: string,
  platformName: string
) {
  if (!recommendedProducts?.length || !storeName || !platformName) return null;

  try {
    const { data } = await axios.post<RecommendedProductsResponse>(
      `${API_BASE_URL}/recommended-products`,
      {
        recommended_products: recommendedProducts,
        storeName,
        platformName,
      }
    );

    if (!data) return null;

    return data;
  } catch (error) {
    console.error("❌ Erro ao pegar os produtos recomendados:", error);

    return null;
  }
}
