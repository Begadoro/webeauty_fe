import { Href } from "expo-router";

export type InternalRoute = Href;

export const routes: Record<string, Href> = {
  LOGIN: "/(auth)/login",
  REGISTER: "/(auth)/register",
  HOME: "/(home)",
  SEARCH: "/(home)/search",
  PROFILE: "/(profile)",
  CUSTOMIZATION: "/(profile)/customization",
  SHOP: "/(shop)",
};
