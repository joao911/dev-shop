import { create } from "zustand";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (productId: number) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { productId, quantity: 1 }],
      };
    }),

  removeItem: (productId: number) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  clear: () => set({ items: [] }),
}));
