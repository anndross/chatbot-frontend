export const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-br", { style: "currency", currency: "BRL" }).format(
    price
  );
