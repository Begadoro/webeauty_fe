import { Href } from "expo-router";

export type InternalRoute = Href;

export const routes: Record<string, Href> = {
  LOGIN: "/(auth)/login",
  REGISTER: "/(auth)/register",
  HOME: "/(tabs)/home",
  SEARCH: "/(tabs)/search",
  MAP: "/(search)/map",
  PROFILE: "/(profile)",
  CUSTOMIZATION: "/(profile)/customization",
  SHOP: "/(shop)",
  TREATMENTS: "/(shop)/treatments",
  CART: "/(cart)",
  BOOKED: "/(cart)/booked",
};
