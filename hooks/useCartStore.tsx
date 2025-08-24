import { MockupTreatment } from "~/constants/mockup";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CartState {
  items: MockupTreatment[];
  setItems: (items: MockupTreatment[]) => void;
  addItem: (item: MockupTreatment) => void;
  removeItem: (item: MockupTreatment) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      setItems: (items: MockupTreatment[]) => set({ items }),
      addItem: (item: MockupTreatment) =>
        set((state) => ({ items: [...state.items, item] })),
      removeItem: (item: MockupTreatment) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
