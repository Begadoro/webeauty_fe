import { FlatList, View } from "react-native";
import { useMemo, useState } from "react";
import { shopsMockup } from "~/constants/mockup";
import { ShopCard } from "~/components/ShopCard";
import { Input } from "~/components/ui/input";
import { MapPin, Search, SlidersHorizontal } from "lucide-react-native";
import CollapsibleScreen from "~/components/CollapsibleScreen";
import {Href, useRouter} from "expo-router";
import { Button } from "~/components/ui/button";
import { routes } from "~/constants/routes";
import { useColorScheme } from "~/lib/useColorScheme";
import colors from "~/constants/colors";

export default function SearchScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();

  const shopList = useMemo(
    () =>
      filter === ""
        ? shopsMockup
        : shopsMockup.filter((shop) =>
            shop.name.toLowerCase().includes(filter.toLowerCase()),
          ),
    [filter],
  );

  return (
    <CollapsibleScreen
      type={1}
      title="Cerca negozio"
      collapsible={false}
      onBack={router.back}
    >
      <View className="flex-1 px-6 gap-1">
        <FlatList
          data={shopList}
          contentContainerClassName="gap-2"
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View className="flex-row gap-2 pb-4 bg-card">
              <Input
                className="flex-1"
                placeholder="Cerca negozio"
                LeftIcon={Search}
                value={filter}
                onChangeText={setFilter}
                RightIcon={SlidersHorizontal}
              />
              <Button variant="outline" onPress={() => router.push(`${routes.MAP}?filteredShops=${JSON.stringify(shopList)}` as Href)}>
                <MapPin
                  color={isDarkColorScheme ? colors.white : colors.black}
                />
              </Button>
            </View>
          }
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => <ShopCard shop={item} />}
        />
      </View>
    </CollapsibleScreen>
  );
}
