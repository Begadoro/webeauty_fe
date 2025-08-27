import CollapsibleScreen from "~/components/CollapsibleScreen";
import { View } from "react-native";
import { H2, H3, Lead, P } from "~/components/ui/typography";
import * as React from "react";
import { useRouter } from "expo-router";
import { Input } from "~/components/ui/input";
import { Search, Store } from "lucide-react-native";
import { routes } from "~/constants/routes";

export default function ShopsScreen() {
  const router = useRouter();
  return (
    <CollapsibleScreen
      image={require("../../assets/images/home-bg.png")}
      collapsible
      type={0}
      title="WeBeauty"
      HeaderContent={
        <View className="px-6">
          <H3 className="text-white">Bentornato Andrea!</H3>
        </View>
      }
    >
      <View className="flex-1 p-6 gap-2">
        <Input
          className="w-full"
          placeholder="Cerca"
          LeftIcon={Search}
          onPress={() => router.push(routes.SEARCH)}
          readOnly
        />
        <H3>Vicino a te</H3>
      </View>
    </CollapsibleScreen>
  );
}
