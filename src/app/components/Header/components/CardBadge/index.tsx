"use client";

import { useCartStore } from "@/store/useAddToCart";
import { ShoppingBag } from "lucide-react";

export default function CardBadge() {
  const { items } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-5 h-4 text-zinc-50" />
      <span className="text-sm">Cart {total}</span>
    </div>
  );
}
