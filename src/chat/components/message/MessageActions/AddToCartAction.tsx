import { Button } from "@/components/ui/button";
import MinicarSVG from "@/assets/minicart.svg";
import { addProduct } from "@/services/addProduct";
import { Product } from "@/services/getRecommendedProducts";
import { ComponentProps } from "react";
import clsx from "clsx";

interface AddToCartActionProps {
  product: Product;
  className: ComponentProps<"div">["className"];
}

export function AddToCartAction({ product, className }: AddToCartActionProps) {
  return (
    <Button
      variant="primary"
      onlyIcon
      aria-label="Adicionar produto ao carrinho"
      className={clsx("border-2! border-secondary!", className)}
      onClick={() => {
        addProduct(product, "casamaisfacil", "vtex");
      }}
    >
      <MinicarSVG />
    </Button>
  );
}
