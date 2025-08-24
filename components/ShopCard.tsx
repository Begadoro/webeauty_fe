import { TouchableOpacity, View } from "react-native";
import { Card } from "~/components/ui/card";
import { Store } from "lucide-react-native";
import colors from "~/constants/colors";
import { H3, P } from "~/components/ui/typography";
import * as React from "react";
import { Image } from "expo-image";
import { Href, useRouter } from "expo-router";
import { MockupShop } from "~/constants/mockup";
import { routes } from "~/constants/routes";

export function ShopCard({ shop }: { shop: MockupShop }) {
  const router = useRouter();
  const { id, name, address, distance, imgUri } = shop;
  return (
    <TouchableOpacity
      onPress={() => router.push(`${routes.SHOP}?id=${id}` as Href)}
    >
      <Card className="flex-row w-full gap-4 p-4 items-center min-h-[80px] bg-card">
        <View className="flex-[1] aspect-square items-center justify-center bg-purpleDark rounded-xl">
          {!imgUri && <Store size={40} color={colors.white} />}
          {imgUri && (
            <Image
              source={{ uri: imgUri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              contentFit="cover"
            />
          )}
        </View>

        {/* Text container */}
        <View className="flex-[2] justify-center">
          <H3 className="leading-none font-bold">{name}</H3>
          <P className="text-gray text-sm">{address}</P>
          <P className="text-gray text-sm">{distance + "m"}</P>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
