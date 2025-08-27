import { FlatList, View } from "react-native";
import { useMemo, useState } from "react";
import { shopsMockup } from "~/constants/mockup";
import { ShopCard } from "~/components/ShopCard";
import { Input } from "~/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react-native";
import CollapsibleScreen from "~/components/CollapsibleScreen";
import { useRouter } from "expo-router";

export default function SearchScreen() {
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
            <View className="pb-4 bg-card">
              <Input
                className="w-full"
                placeholder="Cerca negozio"
                LeftIcon={Search}
                value={filter}
                onChangeText={setFilter}
                RightIcon={SlidersHorizontal}
              />
            </View>
          }
          stickyHeaderIndices={[0]}
          renderItem={({ item }) => <ShopCard shop={item} />}
        />
      </View>
    </CollapsibleScreen>
  );
}
