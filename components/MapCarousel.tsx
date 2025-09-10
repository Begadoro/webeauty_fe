import {RefObject, useRef} from "react";
import MapView from "react-native-maps";
import {MockupShop} from "~/constants/mockup";
import {FlatList, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {Card} from "~/components/ui/card";
import {H4, P} from "~/components/ui/typography";
import Tag from "~/components/Tag";
import { Image} from "expo-image";
import {Href, useRouter} from "expo-router";
import {routes} from "~/constants/routes";

export function MapCarousel({ mapRef, data } : { mapRef: RefObject<MapView | null>, data: MockupShop[] }){
  const { width } = useWindowDimensions();

  const viewConfig = { viewAreaCoveragePercentThreshold: 70 };
  const onViewRef = useRef(({ viewableItems } : { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      const currentItem = viewableItems[0].item;
      mapRef.current?.animateToRegion({
        latitude: parseFloat(currentItem.lat),
        longitude: parseFloat(currentItem.lon),
        latitudeDelta: 0.08,
        longitudeDelta: 0.01
      })
    }
  });

  return (
      <View className="max-h-56">
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CarouselCard shop={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 16 }}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfig}
        />
      </View>
  )
}

function CarouselCard({ shop } : { shop: MockupShop }){
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
      <TouchableOpacity style={{ width: width * 0.8, marginRight: 16 }} onPress={() => router.push(`${routes.SHOP}?id=${shop.id}` as Href)}>
        <Card className="shadow-md p-4 h-full justify-between">
          <Image source={{ uri: shop.imgUri }} style={{ width: "100%", height: 70, borderRadius: 10 }}/>
          <View className="gap-1">
            <H4>{shop.name}</H4>
            <P className="text-sm text-gray leading-none">{shop.description}</P>
            <View className="flex-row gap-2">
              <Tag type="hair"/>
              <Tag type="nails"/>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
      )

}