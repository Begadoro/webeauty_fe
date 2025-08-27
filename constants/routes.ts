import { Href } from "expo-router";

export type InternalRoute = Href;

export const routes: Record<string, Href> = {
  LOGIN: "/(auth)/login",
  REGISTER: "/(auth)/register",
  SHOPS: "/(tabs)/shops",
  SEARCH: "/search",
  PROFILE: "/(profile)",
  CUSTOMIZATION: "/(profile)/customization",
  SHOP: "/(shop)",
  TREATMENTS: "/(shop)/treatments",
  CART: "/(cart)",
  BOOKED: "/(cart)/booked",
};
