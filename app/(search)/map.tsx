import CollapsibleScreen from "~/components/CollapsibleScreen";
import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import {useLocalSearchParams, useRouter } from "expo-router";
import { useWindowDimensions, View} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {MockupShop, shopsMockup} from "~/constants/mockup";
import {useEffect, useRef} from "react";
import {useLoader} from "~/hooks/useLoader";
import {MapCarousel} from "~/components/MapCarousel";


export default function MapScreen() {
  const router = useRouter();
  const loader = useLoader();

  const { filteredShops } = useLocalSearchParams();
  const shops: MockupShop[] = filteredShops ? JSON.parse(filteredShops as string) : [];

  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    loader.show();
    setTimeout(() => {
      loader.hide();
    },1000)
  }, []);

  function openShopCard(event: MarkerPressEvent) {
    const coords = event.nativeEvent.coordinate;
    shops.find(
        (shop) =>
            parseFloat(shop.lat) === coords.latitude &&
            parseFloat(shop.lon) === coords.longitude,
    );
    mapRef.current?.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.01
    })
  }

  return (
    <CollapsibleScreen
      type={2}
      headerClassName="bg-transparent"
      onBack={router.back}
    >
      <View className="flex-1 flex-col absolute z-30" style={{ bottom: insets.bottom }}>
        <MapCarousel mapRef={mapRef} data={shops} />
      </View>
      <MapView
        style={{ position: "absolute", width, height }}
        showsUserLocation
        ref={mapRef}
      >
        {shops.map((shop) => (
          <Marker
            coordinate={{
              latitude: parseFloat(shop.lat),
              longitude: parseFloat(shop.lon),
            }}
            key={shop.id}
            onPress={(event) => openShopCard(event)}
          />
        ))}
      </MapView>
    </CollapsibleScreen>
  );
}
