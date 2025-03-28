import {
  getRecommendedProducts,
  RecommendedProductsResponse,
} from "@/services/getRecommendedProducts";
import { RecommendedProductsType } from "@/types/chatbot";
import { useEffect, useState, useTransition } from "react";
import { MessageWrapper } from "../MessageWrapper";
import { AddToCartAction } from "./AddToCartAction";
import { formatPrice } from "@/utils/format-price";
import { useChat } from "@/chat/context";

export interface RecommendedProductsActionProps {
  data: RecommendedProductsType;
}

export function RecommendedProductsAction({
  data: recommendedProducts,
}: RecommendedProductsActionProps) {
  const { updateChat } = useChat();
  const [isPending, startTransition] = useTransition();

  const [products, setProducts] = useState<
    RecommendedProductsResponse["recommendedProductsData"]
  >([]);

  useEffect(() => {
    updateChat({ loadingMessage: isPending });
  }, [isPending]);

  useEffect(() => {
    async function getProducts() {
      startTransition(async () => {
        const productsResponse = await getRecommendedProducts(
          recommendedProducts
        );

        if (!productsResponse) return;

        setProducts(productsResponse.recommendedProductsData);
      });
    }

    getProducts();
  }, [recommendedProducts]);

  return (
    <div className="mb-6">
      {products.map((product) => {
        return (
          <MessageWrapper key={product.itemId} variant="bot">
            <div className="w-full h-full max-h-24 flex items-center gap-4">
              <div className="relative h-full">
                <img
                  className="h-20 w-20 max-w-max aspect-square"
                  src={product.imageUrl}
                  alt={product.name}
                  title={product.name}
                  width={100}
                  height={100}
                />

                <AddToCartAction
                  className="absolute -left-2 -bottom-2"
                  product={product}
                />
              </div>

              <a
                className="flex flex-col gap-3 w-full text-white underline font-bold text-xs leading-3.5"
                href={product.link}
              >
                <span>{product.name}</span>

                <div className="flex gap-2 font-normal">
                  {product.listPrice === product.price ? (
                    <strong>{formatPrice(product.price)}</strong>
                  ) : (
                    <>
                      <del>{formatPrice(product.listPrice)}</del>
                      <strong>{formatPrice(product.price)}</strong>
                    </>
                  )}
                </div>
              </a>
            </div>
          </MessageWrapper>
        );
      })}
    </div>
  );
}
