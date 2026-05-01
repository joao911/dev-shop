"use client";

import { useCartStore } from "@/store/useAddToCart";

interface ButtonAddToCartProps {
  productId: number;
}

export default function ButtonAddToCart({ productId }: ButtonAddToCartProps) {
  const { addItem, items } = useCartStore();
  console.log("item no carrinho ", items);
  return (
    <button
      onClick={() => {
        addItem(productId);
        console.log("cliquei");
      }}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
}
