import { RecommendedProductsResponse } from "@/services/getRecommendedProducts";
import { Message } from "@/types/chatbot";
import { useEffect, useState } from "react";
import { MessageContainer } from "@/chat/components/conversation/message/container";
import { AddToCartAction } from "@/chat/components/conversation/message/mapped-messages/add-to-cart";
import { formatPrice } from "@/utils/format-price";

export interface RecommendedProductsProps {
  data: Message;
}

export function RecommendedProducts({ data }: RecommendedProductsProps) {
  const [products, setProducts] = useState<
    RecommendedProductsResponse["recommendedProductsData"]
  >(data.action?.data || []);

  useEffect(() => {
    if (data.action?.data) setProducts(data.action?.data);
  }, [data.action?.data]);

  return (
    <div className="mb-6">
      {products?.map((product) => {
        return (
          <MessageContainer key={product.itemId} variant="bot">
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
          </MessageContainer>
        );
      })}
    </div>
  );
}
