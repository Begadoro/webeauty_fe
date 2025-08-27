import { MockupTreatment } from "~/constants/mockup";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartState {
  shopId: string;
  shopName: string;
  subTotal: number;
  discount: number;
  total: number;
  items: MockupTreatment[];

  setShopId: (shopId: string) => void;
  setShopName: (shopName: string) => void;
  setItems: (items: MockupTreatment[]) => void;
  addItem: (item: MockupTreatment) => void;
  removeItem: (item: MockupTreatment) => void;
  clearCart: () => void;
  setDiscount: (discount: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      shopId: "",
      shopName: "",
      items: [],
      subTotal: 0,
      discount: 0,
      total: 0,

      setShopId: (shopId: string) => set({ shopId }),
      setShopName: (shopName: string) => set({ shopName }),

      setItems: (items: MockupTreatment[]) =>
        set((state) => {
          const subTotal = items.reduce((sum, i) => sum + i.price, 0);
          return {
            items,
            subTotal,
            total: subTotal - state.discount,
          };
        }),

      addItem: (item: MockupTreatment) =>
        set((state) => {
          const updated = [...state.items, item];
          const subTotal = updated.reduce((sum, i) => sum + i.price, 0);
          return {
            items: updated,
            subTotal,
            total: subTotal - state.discount,
          };
        }),

      removeItem: (item: MockupTreatment) =>
        set((state) => {
          const updated = state.items.filter((i) => i.id !== item.id);
          const subTotal = updated.reduce((sum, i) => sum + i.price, 0);
          return {
            items: updated,
            subTotal,
            total: subTotal - state.discount,
          };
        }),

      clearCart: () => set({ items: [], subTotal: 0, total: 0, discount: 0 }),

      setDiscount: (discount: number) =>
        set((state) => ({
          discount,
          total: state.subTotal - discount,
        })),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        shopId: state.shopId,
        shopName: state.shopName,
        items: state.items,
        subTotal: state.subTotal,
        discount: state.discount,
        total: state.total,
      }),
    },
  ),
);
